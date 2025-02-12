package models

import "time"

type Video struct {
    ID          int64     `json:"id"`
    Title       string    `json:"title"`
    Author      string    `json:"author"`
    CoverURL    string    `json:"cover_url"`
    VideoLength int       `json:"video_length"`
    LikeCount   int       `json:"like_count"`
    ViewCount   int       `json:"view_count"`
    CreatedAt   time.Time `json:"created_at"`
}

type VideoFilter struct {
    Title      string `form:"title"`
    Author     string `form:"author"`
    StartDate  string `form:"start_date"`
    EndDate    string `form:"end_date"`
    SortByLikes bool   `form:"sort_by_likes"`
    Page       int    `form:"page" binding:"required,min=1"`
    PageSize   int    `form:"page_size" binding:"required,min=1,max=50"`
}
