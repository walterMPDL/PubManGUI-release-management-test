export interface ImportLogDbVO {
    id: number;
    status: ImportStatus; 
    errorLevel: ImportErrorLevel;
    startDate: Date;
    endDate: Date;
    userId: string;
    name: string;
    format: ImportFormat;
    contextId: string;
    percentage: number;
}

export interface ImportLogItemDbVO {
    id:	number;
    status: ImportStatus; 
    errorLevel: ImportErrorLevel;
    startDate: Date;
    endDate: Date;
    parent: ImportLogDbVO;
    message: string;
    itemId:	string;
} 

export interface ImportLogItemDetailDbVO {
    id:	number;
    status: ImportStatus; 
    errorLevel: ImportErrorLevel;
    startDate: Date;
    endDate: Date;
    parent: ImportLogItemDetailDbVO;
    message: string;
} 

export enum ImportStatus {
    FINISHED = "FINISHED",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED",
}

export enum ImportErrorLevel {
    ERROR = "ERROR",
    FATAL = "FATAL",
    FINE = "FINE",
    PROBLEM = "PROBLEM",
    WARNING = "WARNING",
}

export enum ImportFormat {
    BIBTEX_STRING = 'BIBTEX_STRING',
    BMC_XML = 'BMC_XML', 
    EDOC_XML = 'EDOC_XML', 
    ENDNOTE_STRING = 'ENDNOTE_STRING', 
    ESCIDOC_ITEM_V3_XML = 'ESCIDOC_ITEM_V3_XML', 
    MARC_XML = 'MARC_XML', 
    RIS_STRING = 'RIS_STRING', 
    WOS_STRING= 'WOS_STRING',
}
