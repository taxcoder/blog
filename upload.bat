@echo on


scp -r .\packages\web-client\dist\* root@119.29.246.22:/usr/software/client/nginx/html
scp .\packages\web-client\nginx.conf root@119.29.246.22:/usr/software/client/nginx/conf

scp -r .\packages\manage-client\dist\* root@119.29.246.22:/usr/software/manage/nginx/html
scp .\packages\manage-client\nginx.conf root@119.29.246.22:/usr/software/manage/nginx/conf