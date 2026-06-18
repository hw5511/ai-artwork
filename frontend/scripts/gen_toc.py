#!/usr/bin/env python3
"""lectures/toc.json -> frontend/src/data/tocData.ts 생성.

toc.json 이 목차 정본(source of truth). 이 스크립트로 tocData.ts 를 재생성한다.
경로는 스크립트 위치(frontend/scripts) 기준 레포 상대경로.
"""
import json, os

_script_dir = os.path.dirname(os.path.abspath(__file__))
_repo_root = os.path.abspath(os.path.join(_script_dir, '..', '..'))
toc_file = os.path.join(_repo_root, 'lectures', 'toc.json')
output_file = os.path.join(_repo_root, 'frontend', 'src', 'data', 'tocData.ts')

PREAMBLE = '''// Auto-generated from toc.json

export interface Step {
  id: string
  title: string
  file: string
  hidden?: boolean
}

export interface Session {
  id: string
  title: string
  steps: Step[]
}

export const TOC_DATA: Session[] = '''

with open(toc_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(PREAMBLE)
    f.write(json.dumps(data, ensure_ascii=False, indent=2))
    f.write('\n')

print(f'완료: {output_file} (세션 {len(data)}개)')
