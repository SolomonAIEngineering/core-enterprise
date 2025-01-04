#!/bin/bash

check_remote() {
    git remote -v
}

add_upstream() {
    if ! git remote | grep -q "upstream"; then
        git remote add upstream git@github.com:midday-ai/midday.git
    fi
}

update_from_template() {
    git pull --no-commit upstream main

    if [ $? -eq 0 ] && [ -f .git/MERGE_HEAD ]; then
        read -p "Review changes. Continue merge? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            git merge --continue
        else
            git merge --abort
        fi
    fi
}

check_remote
add_upstream
update_from_template