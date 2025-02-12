package handlers

import (
    "database/sql"
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/liaofeng/afa/internal/models"
)

type VideoHandler struct {
    db *sql.DB
}

func NewVideoHandler(db *sql.DB) *VideoHandler {
    return &VideoHandler{db: db}
}

func (h *VideoHandler) ListVideos(c *gin.Context) {
    var filter models.VideoFilter
    if err := c.ShouldBindQuery(&filter); err != nil {
        // Set default values if not provided
        if filter.Page == 0 {
            filter.Page = 1
        }
        if filter.PageSize == 0 {
            filter.PageSize = 12
        }
    }

    query := `SELECT id, title, author, cover_url, video_length, like_count, view_count, created_at 
             FROM videos WHERE 1=1`
    args := []interface{}{}

    if filter.Title != "" {
        query += ` AND title LIKE ?`
        args = append(args, "%"+filter.Title+"%")
    }
    if filter.Author != "" {
        query += ` AND author LIKE ?`
        args = append(args, "%"+filter.Author+"%")
    }
    if filter.StartDate != "" {
        query += ` AND created_at >= ?`
        args = append(args, filter.StartDate)
    }
    if filter.EndDate != "" {
        query += ` AND created_at <= ?`
        args = append(args, filter.EndDate)
    }

    if filter.SortByLikes {
        query += ` ORDER BY like_count DESC`
    } else {
        query += ` ORDER BY created_at DESC`
    }

    offset := (filter.Page - 1) * filter.PageSize
    query += ` LIMIT ? OFFSET ?`
    args = append(args, filter.PageSize, offset)

    rows, err := h.db.Query(query, args...)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var videos []models.Video
    for rows.Next() {
        var v models.Video
        if err := rows.Scan(&v.ID, &v.Title, &v.Author, &v.CoverURL, &v.VideoLength, 
                          &v.LikeCount, &v.ViewCount, &v.CreatedAt); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        videos = append(videos, v)
    }

    c.JSON(http.StatusOK, videos)
}

func (h *VideoHandler) CreateVideo(c *gin.Context) {
    var video models.Video
    if err := c.ShouldBindJSON(&video); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result, err := h.db.Exec(`
        INSERT INTO videos (title, author, cover_url, video_length, like_count, view_count)
        VALUES (?, ?, ?, ?, ?, ?)`,
        video.Title, video.Author, video.CoverURL, video.VideoLength, video.LikeCount, video.ViewCount)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    id, _ := result.LastInsertId()
    video.ID = id
    c.JSON(http.StatusCreated, video)
}

func (h *VideoHandler) UpdateVideo(c *gin.Context) {
    var video models.Video
    if err := c.ShouldBindJSON(&video); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := h.db.Exec(`
        UPDATE videos SET title=?, author=?, cover_url=?, video_length=?, like_count=?, view_count=?
        WHERE id=?`,
        video.Title, video.Author, video.CoverURL, video.VideoLength, video.LikeCount, video.ViewCount, video.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, video)
}

func (h *VideoHandler) DeleteVideo(c *gin.Context) {
    id := c.Param("id")
    _, err := h.db.Exec("DELETE FROM videos WHERE id=?", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.Status(http.StatusNoContent)
}
