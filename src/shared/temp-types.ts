/**
 * SPDX-License-Identifier: UNLICENSED
 * Copyright: Proprietary
 * 
 * Temporary type definitions to replace missing ui-tars types
 */

export enum StatusEnum {
  INIT = 'INIT',
  RUNNING = 'RUNNING',
  END = 'END',
  ERROR = 'ERROR',
  MAX_LOOP = 'MAX_LOOP'
}

export interface Operator {
  execute(params: any): Promise<any>;
  cleanup?(): Promise<void>;
}

export interface Conversation {
  id: string;
  messages: any[];
  timestamp: number;
}