# scp -r -i /Users/DanielJiang/Documents/ec2/LightsailDefaultKey-eu-west-2.pem ./dist ubuntu@35.179.83.40:/home/ubuntu/project 
aws s3 cp ./dist s3://hoteldemo.i568.me --acl public-read --recursive --profile jy-dan