#!/bin/bash

echo "[JOBS] Start sub-projects building ..."

echo "[JOB] Start `ife/2018/basic/mis` building ..."
bash -c "cd ./ife/2018/basic/mis && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &

echo "[JOB] Start `ife/2018/basic/oop` building ..."
bash -c "cd ./ife/2018/basic/oop && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &

echo "[JOB] Start `ife/2018/mvvm` building ..."
bash -c "cd ./ife/2018/mvvm && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../" &

echo "[JOB] Start `vue-modal` building ..."
bash -c "cd ./vue/vue-modal && npm install && npm run build && rm -fr src && mv ./dist/* . && cd ../../" &

wait
echo "[SUCCESS] All jobs completed !"
