from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

# dist 폴더 경로
DIST_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

@app.route('/')
def index():
    """메인 페이지 - index.html 반환"""
    return send_file(os.path.join(DIST_FOLDER, 'index.html'))

@app.route('/<path:path>')
def serve_static(path):
    """정적 파일 서빙"""
    # 정적 파일이 존재하면 직접 서빙
    file_path = os.path.join(DIST_FOLDER, path)
    if os.path.isfile(file_path):
        return send_from_directory(DIST_FOLDER, path)
    
    # 확장자가 있는 파일 요청이지만 존재하지 않으면 404
    if '.' in path.split('/')[-1]:
        try:
            return send_from_directory(DIST_FOLDER, path)
        except FileNotFoundError:
            return "File not found", 404
    
    # SPA 라우팅 경로들은 index.html 반환
    return send_file(os.path.join(DIST_FOLDER, 'index.html'))

if __name__ == '__main__':
    print("AI Artwork Frontend Static Server")
    print(f"Serving from: {DIST_FOLDER}")
    print("Access: http://localhost:3001")
    print("External: http://0.0.0.0:3001")
    
    app.run(host='0.0.0.0', port=3001, debug=False)