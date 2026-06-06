export interface User {
  id:    string
  email: string
  name:  string
  role:  'VISITOR' | 'ADMIN' | 'SUPER_ADMIN'
}

export interface Article {
  id:          string
  title:       string
  slug:        string
  excerpt?:    string
  content:     string
  category:    string
  tags?:       string
  coverImage?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt:   Date
  author:      Pick<User, 'id' | 'name'>
}

export interface Resource {
  id:          string
  title:       string
  description?: string
  type:        'PDF' | 'VIDEO' | 'PODCAST' | 'RAPPORT' | 'PLAQUETTE' | 'GUIDE'
  fileUrl:     string
  isPremium:   boolean
  downloads:   number
  theme?:      string
  language:    string
}

export interface ContactMessage {
  id:       string
  name:     string
  email:    string
  subject:  string
  message:  string
  status:   'UNREAD' | 'READ' | 'ARCHIVED'
  sentAt:   Date
}

export interface Organization {
  id:          string
  name:        string
  description?: string
  country:     string
  sector:      string
  status:      'PENDING' | 'APPROVED' | 'REJECTED'
  website?:    string
}

export interface ApiResponse<T = void> {
  success: boolean
  message?: string
  data?:    T
  errors?:  string[]
}

export interface PaginatedResponse<T> {
  data:       T[]
  total:      number
  page:       number
  limit:      number
  totalPages: number
}

export type NavItem = {
  label: string
  href:  string
  children?: NavItem[]
}