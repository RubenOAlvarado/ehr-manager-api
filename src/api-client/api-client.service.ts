/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
// not installed, prepared for future implementation
//import axios from axios;

@Injectable()
export class ApiClientService {
  async sendDataToEhr(
    requestPayload: Record<string, any>,
    authConfig: Record<string, string>,
    credentials: Record<string, string>,
    // baseUrl: string,
  ) {
    // Prepare headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      ...this.buildAuthHeaders(authConfig, credentials),
    };
    // Simulate API response for testing
    const mockResponse = {
      status: 200,
      data: {
        patientId: '12345',
        records: [
          {
            id: 'rec_001',
            type: 'consultation',
            date: '2024-03-20',
            details: 'Routine checkup',
          },
        ],
        metadata: {
          requestId: 'req_789',
          timestamp: new Date().toISOString(),
        },
      },
    };

    // Return mock response after simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse.data);
      }, 500);
    });
    /* const response = await axios.post(authConfig.url, requestPayload, {
      headers,
    });
    return response.data; */
  }

  private buildAuthHeaders(
    authConfig: Record<string, string>,
    credentials: Record<string, string>,
  ): Record<string, string> {
    const headers: Record<string, string> = {};

    if (!authConfig) return headers;

    const config = { ...authConfig, ...credentials };

    switch (config.type?.toLowerCase()) {
      case 'bearer':
        headers['Authorization'] = `Bearer ${config.token}`;
        break;
      case 'basic': {
        const auth = Buffer.from(
          `${config.username}:${config.password}`,
        ).toString('base64');
        headers['Authorization'] = `Basic ${auth}`;
        break;
      }
      case 'apikey':
        if (config.in === 'header') {
          headers[config.name] = config.value;
        }
        break;
    }

    if (config.additionalHeaders) {
      Object.assign(headers, config.additionalHeaders);
    }

    return headers;
  }
}
