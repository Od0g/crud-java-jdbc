
// Tipos para os modelos de dados que correspondem às entidades Java

export interface Machine {
  id?: number;
  name: string;
  model: string;
  serialNumber: string;
  manufacturer: string;
  purchaseDate: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  lastMaintenanceDate?: string;
  notes?: string;
}

export interface ServiceOrder {
  id?: number;
  orderNumber: string;
  machineId: number;
  machine?: Machine;
  description: string;
  maintenanceType: MaintenanceType;
  startDate: string;
  endDate?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  technician: string;
  laborHours: number;
  parts?: Part[];
  totalCost?: number;
  notes?: string;
}

export interface Labor {
  id?: number;
  employeeName: string;
  role: string;
  hourlyRate: number;
  serviceOrderId?: number;
  hours: number;
  date: string;
  notes?: string;
}

export interface Part {
  id?: number;
  name: string;
  partNumber: string;
  manufacturer: string;
  price: number;
  quantity: number;
  location?: string;
  reorderPoint?: number;
  category?: string;
  serviceOrderId?: number;
  usedQuantity?: number;
}

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  PREDICTIVE = 'PREDICTIVE',
  ROUTINE = 'ROUTINE'
}
