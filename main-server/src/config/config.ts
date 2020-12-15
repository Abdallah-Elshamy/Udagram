require('dotenv').config();

export const config = {
  "dev": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_BUCKET,
    "jwt_secret": process.env.JWT_SECRET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
