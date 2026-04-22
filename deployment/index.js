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
const cdk = __importStar(require("aws-cdk-lib"));
const static_site_1 = require("./static-site");
class MyStaticSiteStack extends cdk.Stack {
    constructor(parent, name) {
        super(parent, name);
        new static_site_1.StaticSite(this, "RSSchoolStaticSite");
    }
}
const app = new cdk.App();
new MyStaticSiteStack(app, "MyRSSchoolStaticWebsiteCFStack");
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFDbkMsK0NBQTJDO0FBRTNDLE1BQU0saUJBQWtCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDdkMsWUFBWSxNQUFlLEVBQUUsSUFBWTtRQUN2QyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBCLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTdELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IFN0YXRpY1NpdGUgfSBmcm9tIFwiLi9zdGF0aWMtc2l0ZVwiO1xuXG5jbGFzcyBNeVN0YXRpY1NpdGVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkFwcCwgbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIG5ldyBTdGF0aWNTaXRlKHRoaXMsIFwiUlNTY2hvb2xTdGF0aWNTaXRlXCIpO1xuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbm5ldyBNeVN0YXRpY1NpdGVTdGFjayhhcHAsIFwiTXlSU1NjaG9vbFN0YXRpY1dlYnNpdGVDRlN0YWNrXCIpO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==