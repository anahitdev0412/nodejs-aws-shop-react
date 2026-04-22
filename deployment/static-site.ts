#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as iam from "aws-cdk-lib/aws-iam";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export class StaticSite extends Construct {
  constructor(parent: cdk.Stack, name: string) {
    super(parent, name);

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "cloudfrontOAI",
      {
        comment: `OAI for ${name}`,
      }
    );

    const siteBucket = new s3.Bucket(this, "awsStaticWebsiteBucketCF", {
      bucketName: "aws-static-website-bucket-cf",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId,
          ),
        ],
      })
    );

    const distribution = new cloudfront.Distribution(
      this,
      "awsDevCFDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: new origins.S3Origin(siteBucket, {
            originAccessIdentity: cloudfrontOAI,
          }),
        },
      }
    );

    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
