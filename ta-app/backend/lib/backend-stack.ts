import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { CfnOutput } from 'aws-cdk-lib';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a DynamoDB table to store tasks.
    const taskTable = new ddb.Table(this, "Tasks", {
      partitionKey: { name: "id", type: ddb.AttributeType.STRING },
      // sortKey: { name: "pickUp.time", type: ddb.AttributeType.NUMBER },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    })

    // Create a DynamoDB table to store robots.
    const robotTable = new ddb.Table(this, "Robots", {
      partitionKey: { name: "id", type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    })

    // Create a DynamoDB table to store logs.
    const logTable = new ddb.Table(this, "Logs", {
      partitionKey: { name: "id", type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    })
        
    const api = new lambda.Function(this, "API", {
      timeout: cdk.Duration.seconds(15),
      code: lambda.Code.fromAsset("../api", {
        bundling: {
          image: lambda.Runtime.PYTHON_3_8.bundlingImage,
          command: [
            "bash",
            "-c",
            "pip install -r requirements.txt -t /asset-output && cp -au . /asset-output",
          ]
        }
      }),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: "ta.handler",
      architecture: lambda.Architecture.ARM_64,
      environment: {
        TABLE_TASK: taskTable.tableName,
        TABLE_ROBOT: robotTable.tableName,
        TABLE_LOG: logTable.tableName,
      }
    })

    const functionURL = api.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ["*"],
      }
    })

    new CfnOutput(this, "APIUrl", {
      value: functionURL.url,
    })

    // Give Lambda permissions to access the DDB table.
    taskTable.grantReadWriteData(api);
    robotTable.grantReadWriteData(api);
    logTable.grantReadWriteData(api);
  }
}
