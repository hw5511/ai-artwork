export interface User {
  id: number
  username: string
  email: string
  profile_image?: string
  is_active?: boolean
  created_at?: string
}

export interface Artwork {
  id: number
  user_id: number
  title: string
  description?: string
  image_path: string
  thumbnail_paths?: string[]
  classroom_id?: number
  original_filename?: string
  file_size?: number
  mime_type?: string

  // SD 메타데이터 (확장됨)
  checkpoint_model?: string
  lora_models?: string[]
  model_links?: string
  positive_prompt?: string
  negative_prompt?: string
  sampling_method?: string
  sampler_name?: string
  sampling_steps?: number
  steps?: number
  cfg_scale?: number
  seed?: string
  scheduler?: string
  width?: number
  height?: number
  guidance_scale?: number
  strength?: number
  denoising_strength?: number

  created_at: string
  updated_at?: string
  view_count: number
  is_public: boolean
  is_active: boolean
  user: User
  like_count: number
  comment_count: number
  is_liked: boolean
}

export interface ArtworkUploadRequest {
  title: string
  description?: string
  classroom_id?: number

  // SD 메타데이터 (선택적)
  checkpoint_model?: string
  lora_models?: string[]
  model_links?: string
  positive_prompt?: string
  negative_prompt?: string
  sampling_method?: string
  sampler_name?: string
  sampling_steps?: number
  steps?: number
  cfg_scale?: number
  seed?: string
  scheduler?: string
  width?: number
  height?: number
  guidance_scale?: number
  strength?: number
  denoising_strength?: number
}

export interface SDMetadata {
  checkpoint_model?: string
  lora_models?: string[]
  model_links?: string
  positive_prompt?: string
  negative_prompt?: string
  sampling_method?: string
  sampler_name?: string
  sampling_steps?: number
  steps?: number
  cfg_scale?: number
  seed?: string
  scheduler?: string
  width?: number
  height?: number
  guidance_scale?: number
  strength?: number
  denoising_strength?: number
}

export interface Comment {
  id: number
  user_id: number
  artwork_id: number
  content: string
  is_deleted: boolean
  created_at: string
  user: User
}

export interface CommentCreate {
  content: string
}
