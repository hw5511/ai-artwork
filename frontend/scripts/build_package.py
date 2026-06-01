#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Package 빌드 자동화 스크립트
메인 서버 데이터를 보호하면서 개별 Package를 빌드합니다.
"""

import os
import sys
import shutil
import subprocess

# Windows 콘솔 인코딩 설정
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def build_package(session_number):
    """
    특정 세션에 대한 Package를 빌드합니다.

    Args:
        session_number: 세션 번호 (2, 3, 4)
    """
    print("=" * 70)
    print(f"Package {session_number} 빌드 시작")
    print("=" * 70)

    # 경로 설정
    script_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.dirname(script_dir)
    project_root = os.path.dirname(frontend_dir)

    lecture_contents_path = os.path.join(frontend_dir, 'src', 'data', 'lectureContents.ts')
    backup_path = lecture_contents_path + '.backup'

    package_lectures_dir = os.path.join(project_root, 'zips', f'package_{session_number}', 'lectures')
    convert_script = os.path.join(script_dir, 'generate_lecture_contents.py')

    try:
        # 1단계: 원본 lectureContents.ts 백업
        print(f"\n[1/5] 원본 lectureContents.ts 백업 중...")
        shutil.copy2(lecture_contents_path, backup_path)
        print(f"  ✓ 백업 완료: {backup_path}")

        # 2단계: 마크다운 변환 스크립트 수정
        print(f"\n[2/5] 마크다운 변환 스크립트 수정 중...")
        with open(convert_script, 'r', encoding='utf-8') as f:
            script_content = f.read()

        # source_dir을 package_N으로 변경
        original_line = "source_dir = os.path.join(project_root, 'backend', 'static', 'lectures')"
        modified_line = f"source_dir = os.path.join(project_root, 'zips', 'package_{session_number}', 'lectures')"

        script_content = script_content.replace(original_line, modified_line)

        with open(convert_script, 'w', encoding='utf-8') as f:
            f.write(script_content)
        print(f"  ✓ 스크립트 수정 완료 (Package {session_number}용)")

        # 3단계: 마크다운 변환 실행
        print(f"\n[3/5] 마크다운 변환 실행 중...")
        result = subprocess.run(
            [sys.executable, convert_script],
            cwd=frontend_dir,
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(f"마크다운 변환 실패:\n{result.stderr}")

        print(result.stdout)
        print(f"  ✓ 마크다운 변환 완료")

        # 4단계: Vite 빌드
        print(f"\n[4/5] Vite 빌드 실행 중...")

        # 환경변수 설정
        env = os.environ.copy()
        env['VITE_SESSION_FILTER'] = f'session{session_number}'

        result = subprocess.run(
            ['npm', 'run', 'build'],
            cwd=frontend_dir,
            env=env,
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(f"Vite 빌드 실패:\n{result.stderr}")

        print(result.stdout)
        print(f"  ✓ Vite 빌드 완료")

        # 5단계: 빌드 결과물 복사
        print(f"\n[5/5] 빌드 결과물 복사 중...")

        dist_html = os.path.join(frontend_dir, 'dist', 'index.html')
        package_html = os.path.join(project_root, 'zips', f'package_{session_number}', f'session{session_number}.html')

        shutil.copy2(dist_html, package_html)

        file_size = os.path.getsize(package_html) / 1024
        print(f"  ✓ 복사 완료: {package_html}")
        print(f"  ✓ 파일 크기: {file_size:.2f} KB")

        print(f"\n{'=' * 70}")
        print(f"✅ Package {session_number} 빌드 성공!")
        print(f"{'=' * 70}\n")

        return True

    except Exception as e:
        print(f"\n❌ 에러 발생: {e}")
        return False

    finally:
        # 6단계: 원본 복원
        print(f"\n[복원] 원본 lectureContents.ts 복원 중...")

        if os.path.exists(backup_path):
            shutil.copy2(backup_path, lecture_contents_path)
            os.remove(backup_path)
            print(f"  ✓ 원본 복원 완료")

        # 스크립트도 원상 복구
        with open(convert_script, 'r', encoding='utf-8') as f:
            script_content = f.read()

        modified_line = f"source_dir = os.path.join(project_root, 'zips', 'package_{session_number}', 'lectures')"
        original_line = "source_dir = os.path.join(project_root, 'backend', 'static', 'lectures')"

        script_content = script_content.replace(modified_line, original_line)

        with open(convert_script, 'w', encoding='utf-8') as f:
            f.write(script_content)
        print(f"  ✓ 스크립트 복원 완료")


def main():
    """메인 함수"""
    if len(sys.argv) < 2:
        print("사용법: python build_package.py <세션번호>")
        print("예시: python build_package.py 2")
        sys.exit(1)

    try:
        session_number = int(sys.argv[1])

        if session_number not in [2, 3, 4]:
            print("❌ 세션 번호는 2, 3, 4 중 하나여야 합니다.")
            sys.exit(1)

        success = build_package(session_number)

        if not success:
            sys.exit(1)

    except ValueError:
        print("❌ 세션 번호는 숫자여야 합니다.")
        sys.exit(1)


if __name__ == '__main__':
    main()
