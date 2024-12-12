# Node.js LTS 버전을 기반 이미지로 사용
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16

# 작업 디렉토리 설정
WORKDIR /app


# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# Next.js 소스 코드 복사
COPY . .

# Next.js 빌드 실행
RUN npm run build