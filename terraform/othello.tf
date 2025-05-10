provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "othello-deployer" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "othello_sg" {
  name        = "othello-sg"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["bastion_machine_IP"] # for security we can only SSH into the machine using a bastion ma
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "othello_app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.othello_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              curl -sL https://rpm.nodesource.com/setup_18.x | bash -
              yum install -y nodejs git
              git clone https://github.com/AymanMagdy/gainline_devops_task.git /home/ec2-user/app
              cd /home/ec2-user/app/othello/othello_app
              npm run install
              npm run build
              npm install -g pm2
              pm2 start npm --name othello -- start
              pm2 startup systemd
              pm2 save
            EOF

  tags = {
    Name = "OthelloApp"
  }
}
