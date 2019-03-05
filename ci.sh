#!/bin/bash

echo "[JOBS] Start sub-projects building ..."

echo "[JOB] Start 'bootstrap-cms' building ..."
bash -c "cd ./css/bootstrap-cms && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../" &

echo "[JOB] Start 'ife/2018/basic/mis' building ..."
bash -c "cd ./ife/2018/basic/mis && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &

echo "[JOB] Start 'ife/2018/basic/oop' building ..."
bash -c "cd ./ife/2018/basic/oop && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &

echo "[JOB] Start 'ife/2018/mvvm' building ..."
bash -c "cd ./ife/2018/mvvm && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../" &

echo "[JOB] Start 'react/nextjs' building ..."
bash -c "cd ./react/nextjs && npm install && npm run build && rm -fr .next components pages && mv ./build/* . && cd ../../" &

echo "[JOB] Start 'react/hooks-form' building ..."
bash -c "cd ./react/hooks-form && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../" &

echo "[JOB] Start 'vue/modal' building ..."
bash -c "cd ./vue/modal && npm install && npm run build && rm -fr src && mv ./dist/* . && cd ../../" &

wait
echo "[SUCCESS] All jobs completed !"
