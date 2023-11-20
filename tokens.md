# Gitlab Agent Registration Token

Token: ZsWzDw8jN-JNqcnwQTLKpFkERmy1bgAAqyK8-egWg6-RQAyriQ

Docker command:

```
docker run --pull=always --rm \
 registry.gitlab.com/gitlab-org/cluster-integration/gitlab-agent/cli:v14.8.1 generate \
 --agent-token=ZsWzDw8jN-JNqcnwQTLKpFkERmy1bgAAqyK8-egWg6-RQAyriQ \
 --kas-address=wss://gitlab.socs.uoguelph.ca/-/kubernetes-agent/ \
 --agent-version v14.8.1 \
 --namespace gitlab-agent | rancher kubectl apply -f -
```

# Gitlab Registry Deploy Token


## Change docker-username, docker-password, docker-email, namespace
username: yiktikagent
token: Js7UNszNV8DT9eDHWLib

rancher kubectl create secret docker-registry regcred --namespace=yiktik --docker-server=registry.socs.uoguelph.ca --docker-username=yiktikagent --docker-password=Js7UNszNV8DT9eDHWLib --docker-email=ldube@uoguelph.ca
