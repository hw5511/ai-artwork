import React from 'react'
import { Button } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderZipIcon from '@mui/icons-material/FolderZip'
import CodeIcon from '@mui/icons-material/Code'

interface DownloadButtonProps {
  file: string
  text: string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ file, text }) => {
  const handleDownload = async () => {
    // GitHub Pages이면 window.location.origin + pathname 기반으로 경로 계산
    // 원본 서버이면 /static/lectures/ 사용
    const origin = window.location.origin;
    const href = origin.includes('github.io')
      ? `${origin}${window.location.pathname.split('/').slice(0, 2).join('/')}/${file}`
      : `/static/${file}`;
    const filename = (typeof file === 'string' ? file.split('/').pop() : null) || 'download';

    try {
      // GitHub Pages는 <a download> 가 cross-origin으로 인식되어 동작하지 않음.
      // fetch로 파일을 Blob으로 받아 Object URL을 생성한 뒤 다운로드한다.
      const response = await fetch(href);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Object URL은 더 이상 필요하지 않으므로 즉시 해제
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download error:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = (typeof filename === 'string' ? filename.split('.').pop()?.toLowerCase() : undefined);
    switch (ext) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'doc':
      case 'docx':
        return <DescriptionIcon />;
      case 'zip':
      case 'rar':
      case '7z':
        return <FolderZipIcon />;
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'py':
      case 'java':
      case 'cpp':
      case 'c':
      case 'html':
      case 'css':
        return <CodeIcon />;
      case 'txt':
      case 'md':
        return <DescriptionIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={getFileIcon(file)}
      onClick={handleDownload}
      sx={{
        my: 2,
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-1px)',
        },
        transition: 'all 0.3s ease'
      }}
    >
      {text}
    </Button>
  );
};
