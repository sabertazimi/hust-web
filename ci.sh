#!/bin/bash

work_dir=$(pwd)
css_proj=(bootstrap-cms)
ife_proj=(basic/mis basic/oop mvvm)
react_proj=(nextjs hooks-form switch)
vue_proj=(modal)
angular_proj=(learn)

echo "[JOBS] Start sub-projects building ..."

for proj in ${css_proj[@]}
do
    echo "[JOB] Start 'css/$proj' building ..."
    bash -c "cd $work_dir/css/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

for proj in ${ife_proj[@]}
do
    echo "[JOB] Start 'ife/2018/$proj' building ..."
    bash -c "cd $work_dir/ife/2018/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

for proj in ${react_proj[@]}
do
    echo "[JOB] Start 'react/$proj' building ..."
    bash -c "cd $work_dir/react/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

for proj in ${vue_proj[@]}
do
    echo "[JOB] Start 'vue/$proj' building ..."
    bash -c "cd $work_dir/vue/$proj && npm install && npm run build && rm -fr src && mv ./dist/* ." &
done

for proj in ${angular_proj[@]}
do
    echo "[JOB] Start 'angular/$proj' building ..."
    bash -c "cd $work_dir/angular/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

wait
echo "[SUCCESS] All jobs completed !"
