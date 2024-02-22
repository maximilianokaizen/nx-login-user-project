import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  @Get('')
  @ApiOperation({ summary: 'Check health status' })
  @ApiResponse({ status: 200, description: 'Returns the health status', type: Object })
  checkHealth() {
    return { status: 'ok' };
  }
}