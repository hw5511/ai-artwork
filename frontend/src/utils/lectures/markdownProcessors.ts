// 이미지 정보 인터페이스
interface ImageInfo {
  fullMatch: string;
  index: number;
  fileName: string;
  isRow: boolean;
  caption: string;
  align: string;
  width: string;
}

// 이미지 태그 전처리 함수
export const processImageTags = (content: string): string => {
  // 안전성 검사: content가 문자열인지 확인
  if (typeof content !== 'string') {
    console.warn('processImageTags: content is not a string', content);
    return String(content || '');
  }

  // [[image: 파일명 | 옵션들 | 캡션]] 패턴 매칭
  const imageTagPattern = /\[\[image:\s*([^\]]+)\]\]/g;

  // 1. 전체 이미지 태그 정보 수집
  const matches = [...content.matchAll(imageTagPattern)];

  // 2. 각 매치의 위치와 옵션 파싱
  const imageInfos: ImageInfo[] = matches.map(match => {
    const inner = match[1];
    const parts = inner.split('|').map((p: string) => p.trim());
    const fileName = parts[0];

    let caption = '';
    let align = '';
    let width = '';
    let isRow = false;

    // 옵션 파싱
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('width:')) {
        const widthValue = part.substring(6).trim();
        const widthMatch = widthValue.match(/^(\d+)%$/);
        if (widthMatch) {
          let percentage = parseInt(widthMatch[1]);
          if (percentage < 10) percentage = 10;
          if (percentage > 100) percentage = 100;
          width = `${percentage}%`;
        }
      } else if (part.startsWith('align:')) {
        align = part.substring(6).trim();
      } else if (part === 'row' || part === 'inline') {
        isRow = true;
      } else {
        caption = part;
      }
    }

    return {
      fullMatch: match[0],
      index: match.index!,
      fileName,
      isRow,
      caption,
      align,
      width
    };
  });

  // 3. 연속된 row 이미지 그룹 식별
  const groups: ImageInfo[][] = [];
  let currentGroup: ImageInfo[] = [];

  for (let i = 0; i < imageInfos.length; i++) {
    const info = imageInfos[i];

    if (info.isRow) {
      currentGroup.push(info);

      // 다음이 없거나 다음이 row가 아니거나 거리가 멀면 그룹 종료
      const isLastOrNextNotRow =
        i === imageInfos.length - 1 ||
        !imageInfos[i + 1].isRow ||
        (imageInfos[i + 1].index - (info.index + info.fullMatch.length) > 100);

      if (isLastOrNextNotRow && currentGroup.length > 0) {
        groups.push([...currentGroup]);
        currentGroup = [];
      }
    } else {
      // row가 아닌 이미지는 그룹 종료
      if (currentGroup.length > 0) {
        groups.push([...currentGroup]);
        currentGroup = [];
      }
    }
  }

  // 4. content를 순회하며 그룹 교체 (뒤에서부터 교체하여 인덱스 안 깨지게)
  let result = content;

  for (const group of groups.reverse()) {
    // 그룹의 시작 인덱스와 끝 인덱스 계산
    const startIndex = group[0].index;
    const endIndex = group[group.length - 1].index + group[group.length - 1].fullMatch.length;

    // 그룹 HTML 생성
    const gridHtml = '<div class="image-grid-container">\n' +
      group.map(img =>
        `<img src="./lectures/images/${img.fileName}" class="grid-image" alt="${img.caption || ''}" />`
      ).join('\n') +
      '\n</div>';

    // 교체
    result = result.slice(0, startIndex) + gridHtml + result.slice(endIndex);
  }

  // 5. 남은 개별 이미지들은 기존 로직으로 처리
  return result.replace(imageTagPattern, (match, inner) => {
    if (!inner || typeof inner !== 'string') {
      console.warn('processImageTags: inner is invalid', inner);
      return match;
    }

    const parts = inner.split('|').map((part: string) => part.trim());
    const fileName = parts[0];

    if (!fileName) return match;

    let caption = '';
    let align = '';
    let width = '';
    let isInline = false;

    // 옵션 파싱
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('width:')) {
        const widthValue = part.substring(6).trim();
        const widthMatch = widthValue.match(/^(\d+)%$/);
        if (widthMatch) {
          let percentage = parseInt(widthMatch[1]);
          if (percentage < 10) percentage = 10;
          if (percentage > 100) percentage = 100;
          width = `${percentage}%`;
        }
      } else if (part.startsWith('align:')) {
        align = part.substring(6).trim();
      } else if (part === 'row' || part === 'inline') {
        isInline = true;
      } else {
        caption = part;
      }
    }

    // 마크다운 이미지 문법으로 변환 - 상대 경로 사용
    const imagePath = `./lectures/images/${fileName}`;
    let markdown = `![${caption}](${imagePath})`;

    // align 또는 width 또는 isInline 옵션이 있으면 HTML img 태그로 변환
    if (align || width || isInline) {
      const className = isInline ? 'inline-image' : '';
      const style = [];
      if (width) {
        style.push(`max-width: ${width}`);
      }
      if (align === 'center') {
        style.push('display: block', 'margin: 0 auto');
      } else if (align === 'left') {
        style.push('float: left', 'margin-right: 20px');
      } else if (align === 'right') {
        style.push('float: right', 'margin-left: 20px');
      }

      const altText = caption ? ` alt="${caption}"` : '';
      const titleText = caption ? ` title="${caption}"` : '';
      const classAttr = className ? ` class="${className}"` : '';
      markdown = `<img src="${imagePath}"${altText}${titleText}${classAttr} style="${style.join('; ')}" />`;
    }

    return markdown;
  });
};

// 다운로드 태그 전처리 함수
export const processDownloadTags = (text: string): string => {
  // 안전성 검사: text가 문자열인지 확인
  if (typeof text !== 'string') {
    console.warn('processDownloadTags: text is not a string', text);
    return String(text || '');
  }

  return text.replace(
    /\[\[download:\s*([^|\]]+)(?:\s*\|\s*([^\]]+))?\]\]/g,
    (_, filename, buttonText) => {
      // filename이 undefined나 null인 경우 처리
      if (!filename) {
        console.warn('processDownloadTags: filename is undefined');
        return '';
      }

      const cleanFilename = filename.trim();
      const displayText = buttonText ? buttonText.trim() : cleanFilename.split('/').pop() || cleanFilename;
      // rehypeRaw가 인식할 수 있도록 내용이 있는 div로 변경
      return `<div class="download-container" data-download-file="${cleanFilename}" data-download-text="${displayText}">${displayText}</div>`;
    }
  );
};

// 동영상 태그 전처리 함수
export const processVideoTags = (text: string): string => {
  // 안전성 검사: text가 문자열인지 확인
  if (typeof text !== 'string') {
    console.warn('processVideoTags: text is not a string', text);
    return String(text || '');
  }

  // [[video: 파일명 | 옵션들 | 캡션]] 패턴 매칭
  return text.replace(
    /\[\[video:\s*([^|\]]+)(?:\s*\|\s*([^\]]+))?\]\]/g,
    (_, filename, options) => {
      if (!filename) {
        console.warn('processVideoTags: filename is undefined');
        return '';
      }

      const cleanFilename = filename.trim();
      const optionsParts = options ? options.split('|').map((s: string) => s.trim()) : [];

      let width = '100%';
      let caption = '';

      // 옵션 파싱
      for (const opt of optionsParts) {
        if (opt.startsWith('width:')) {
          const widthValue = opt.substring(6).trim();
          const widthMatch = widthValue.match(/^(\d+)%$/);
          if (widthMatch) {
            let percentage = parseInt(widthMatch[1]);
            if (percentage < 10) percentage = 10;
            if (percentage > 100) percentage = 100;
            width = `${percentage}%`;
          }
        } else {
          caption = opt;
        }
      }

      return `<div class="video-container" data-video-file="${cleanFilename}" data-video-width="${width}" data-video-caption="${caption}">${caption || cleanFilename}</div>`;
    }
  );
};

// 섹션 구분자 전처리 함수
export const processSectionDividers = (content: string): string => {
  // 안전성 검사: content가 문자열인지 확인
  if (typeof content !== 'string') {
    console.warn('processSectionDividers: content is not a string', content);
    return String(content || '');
  }

  // ---section--- 패턴 매칭 (줄 단위로)
  return content.replace(
    /^---section---$/gm,
    () => {
      // rehypeRaw가 인식할 수 있도록 내용이 있는 div로 변경
      return '<div class="section-divider">SECTION</div>';
    }
  );
};
