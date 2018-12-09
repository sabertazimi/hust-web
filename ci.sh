#!/bin/bash

echo "[JOBS] Start sub-projects building ..."

bash -c "cd ./css/material-menu-button && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../" &
bash -c "cd ./ife/2018/basic/mis && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &
bash -c "cd ./ife/2018/basic/oop && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../../" &
bash -c "cd ./ife/2018/mvvm && npm install && npm run build && rm -fr src && mv ./build/* . && cd ../../../" &

wait
echo "[SUCCESS] All jobs completed !"
