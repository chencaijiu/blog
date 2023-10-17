下载github的代码仓库，一直报错，以为是key的问题，重新做了上传还是有错误。

ssh下载的话，说没有权限
![[Pasted image 20230708155802.png]]

https下载，连接拒绝
![[Pasted image 20230708155850.png]]


首先打开.ssh文件夹

![[Pasted image 20230708155916.png]]


我以为是known_hosts问题，先到konow_hosts下下把关于github的都删掉

然后再打开config文件，将连接github的端口改成443
```
Host github.com
HostName ssh.github.com
User git
Port 443
```


现在在看这里两天命令都显示成功
```
ssh -T -p 443 git@ssh.github.com 
Hi calmound! You've successfully authenticated, but GitHub does not provide shell access.


```


```
ssh -T git@github.com                      

Hi calmound! You've successfully authenticated, but GitHub does not provide shell access.
```