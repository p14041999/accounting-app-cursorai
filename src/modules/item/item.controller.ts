import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Item')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT', 'STOCK_MANAGER')
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.' })
  async createItem(@Body() body: CreateItemDto) {
    return this.itemService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all items' })
  @ApiResponse({ status: 200, description: 'List of items.' })
  async listItems(@Query() query: any) {
    return this.itemService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'The item with the given ID.' })
  async getItemById(@Param('id') id: string) {
    return this.itemService.findById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT', 'STOCK_MANAGER')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'The updated item.' })
  async updateItem(@Param('id') id: string, @Body() body: UpdateItemDto) {
    return this.itemService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'ACCOUNTANT', 'STOCK_MANAGER')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'The deleted item.' })
  async deleteItem(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
} 