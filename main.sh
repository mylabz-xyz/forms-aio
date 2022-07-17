#!/usr/bin/env bash
[ "$1" = "-h" -o "$1" = "--help" ] && echo "
  This script is to help forms-aio repo management.

  You can set duration with duration="" e.g. 2s, 2m, 2h. Default 1s
" && exit

DEFAULT_COMMIT_MSG=":construction: : in work progress from main lib mylabz-xyz/forms-aio"

for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)
    case "$KEY" in
            prepare)              prepare=${VALUE} ;;
            init)              init=${VALUE} ;;
            pull)              pull=${VALUE} ;;
            push)              push=${VALUE} ;;
            push-force)              push-force=${VALUE} ;;
            checkout-develop)        checkout-develop=${VALUE} ;;
            msg)        msg=${VALUE} ;;
            commit)        commit=${VALUE} ;;
            *)
    esac
done

[ -z "$1" ] && echo "You can specity -h for help" &&  echo "You need to specify one option, if no value the script will don't start" && exit

if [ -n "$prepare" ]
  then
     git submodule add git@github.com:mylabz-xyz/svelte-forms-aio.git
     git submodule add git@github.com:mylabz-xyz/react-forms-aio.git
     git submodule add git@github.com:mylabz-xyz/vue-forms-aio.git
     git submodule add git@github.com:mylabz-xyz/ng-forms-aio.git
fi

if [ -n "$init" ]
  then
     git submodule init
     git submodule update
fi

if [ -n "$pull" ]
  then
    git submodule foreach git pull
fi

if [ -n "$push" ]
  then
    git submodule foreach git push
fi

if [ -n "$checkout-develop" ]
  then
     git submodule foreach git checkout develop
fi

if [ -n "$commit" ]
  then
     git submodule foreach git commit -m ${msg:-${DEFAULT_COMMIT_MSG}}
fi
