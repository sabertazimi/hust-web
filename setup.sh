#!/bin/bash

# TODO: Setup npm workspaces for monorepo instead of bash scripts

work_dir=$(pwd)
css_proj=(bootstrap-cms)
ife_proj=(basic/mis basic/oop mvvm)
react_proj=(hooks-form nextjs switch)

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

wait
echo "[SUCCESS] All jobs completed !"
