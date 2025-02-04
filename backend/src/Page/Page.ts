export class Page<T> {
    content: any[]; // The list of items for the current page
    totalElements: number; // Total number of elements
    totalPages: number; // Total number of pages
    size: number; // Size of the page
    number: number; // Current page number (0-based index)
    
  }
  