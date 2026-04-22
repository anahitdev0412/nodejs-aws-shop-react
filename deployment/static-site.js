#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSite = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const constructs_1 = require("constructs");
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
const s3deploy = __importStar(require("aws-cdk-lib/aws-s3-deployment"));
const cloudfront = __importStar(require("aws-cdk-lib/aws-cloudfront"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const origins = __importStar(require("aws-cdk-lib/aws-cloudfront-origins"));
class StaticSite extends constructs_1.Construct {
    constructor(parent, name) {
        super(parent, name);
        const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "cloudfrontOAI", {
            comment: `OAI for ${name}`,
        });
        const siteBucket = new s3.Bucket(this, "awsStaticWebsiteBucketCF", {
            bucketName: "aws-static-website-bucket-cf",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        siteBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            resources: [siteBucket.arnForObjects("*")],
            principals: [
                new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
        }));
        const distribution = new cloudfront.Distribution(this, "awsDevCFDistribution", {
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: new origins.S3Origin(siteBucket, {
                    originAccessIdentity: cloudfrontOAI,
                }),
            },
        });
        new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
            sources: [s3deploy.Source.asset("../dist")],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ["/*"],
        });
    }
}
exports.StaticSite = StaticSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQW1DO0FBQ25DLDJDQUF1QztBQUV2Qyx1REFBeUM7QUFDekMsd0VBQTBEO0FBQzFELHVFQUF5RDtBQUN6RCx5REFBMkM7QUFDM0MsNEVBQThEO0FBRTlELE1BQWEsVUFBVyxTQUFRLHNCQUFTO0lBQ3ZDLFlBQVksTUFBaUIsRUFBRSxJQUFZO1FBQ3pDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQ3ZELElBQUksRUFDSixlQUFlLEVBQ2Y7WUFDRSxPQUFPLEVBQUUsV0FBVyxJQUFJLEVBQUU7U0FDM0IsQ0FDRixDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNqRSxVQUFVLEVBQUUsOEJBQThCO1lBQzFDLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDakQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsbUJBQW1CLENBQzVCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDekIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsc0JBQXNCLENBQzVCLGFBQWEsQ0FBQywrQ0FBK0MsQ0FDOUQ7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUM5QyxJQUFJLEVBQ0osc0JBQXNCLEVBQ3RCO1lBQ0UsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixlQUFlLEVBQUU7Z0JBQ2YsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7b0JBQ3ZDLG9CQUFvQixFQUFFLGFBQWE7aUJBQ3BDLENBQUM7YUFDSDtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUM1RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxpQkFBaUIsRUFBRSxVQUFVO1lBQzdCLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuREQsZ0NBbURDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuaW1wb3J0ICogYXMgczMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zM1wiO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50XCI7XG5pbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udFwiO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtaWFtXCI7XG5pbXBvcnQgKiBhcyBvcmlnaW5zIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udC1vcmlnaW5zXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNTaXRlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3IocGFyZW50OiBjZGsuU3RhY2ssIG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICBjb25zdCBjbG91ZGZyb250T0FJID0gbmV3IGNsb3VkZnJvbnQuT3JpZ2luQWNjZXNzSWRlbnRpdHkoXG4gICAgICB0aGlzLFxuICAgICAgXCJjbG91ZGZyb250T0FJXCIsXG4gICAgICB7XG4gICAgICAgIGNvbW1lbnQ6IGBPQUkgZm9yICR7bmFtZX1gLFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgY29uc3Qgc2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgXCJhd3NTdGF0aWNXZWJzaXRlQnVja2V0Q0ZcIiwge1xuICAgICAgYnVja2V0TmFtZTogXCJhd3Mtc3RhdGljLXdlYnNpdGUtYnVja2V0LWNmXCIsXG4gICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIH0pO1xuXG4gICAgc2l0ZUJ1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICBhY3Rpb25zOiBbXCJzMzpHZXRPYmplY3RcIl0sXG4gICAgICAgIHJlc291cmNlczogW3NpdGVCdWNrZXQuYXJuRm9yT2JqZWN0cyhcIipcIildLFxuICAgICAgICBwcmluY2lwYWxzOiBbXG4gICAgICAgICAgbmV3IGlhbS5DYW5vbmljYWxVc2VyUHJpbmNpcGFsKFxuICAgICAgICAgICAgY2xvdWRmcm9udE9BSS5jbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHlTM0Nhbm9uaWNhbFVzZXJJZCxcbiAgICAgICAgICApLFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBjbG91ZGZyb250LkRpc3RyaWJ1dGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBcImF3c0RldkNGRGlzdHJpYnV0aW9uXCIsXG4gICAgICB7XG4gICAgICAgIGRlZmF1bHRSb290T2JqZWN0OiBcImluZGV4Lmh0bWxcIixcbiAgICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbihzaXRlQnVja2V0LCB7XG4gICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRmcm9udE9BSSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIG5ldyBzM2RlcGxveS5CdWNrZXREZXBsb3ltZW50KHRoaXMsIFwiRGVwbG95V2l0aEludmFsaWRhdGlvblwiLCB7XG4gICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KFwiLi4vZGlzdFwiKV0sXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogc2l0ZUJ1Y2tldCxcbiAgICAgIGRpc3RyaWJ1dGlvbixcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiXSxcbiAgICB9KTtcbiAgfVxufVxuIl19