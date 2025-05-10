variable "region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "EC2 Key Pair name - existing"
  type = string
}

variable "public_key_path" {
  description = "Path to the public key file"
  type = string
}

variable "github_repo_url" {
  description = "GitHub repo URL"
  type = string
  default = "https://github.com/AymanMagdy/gainlife_devops_task.git"
}