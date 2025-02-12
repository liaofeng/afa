package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/liaofeng/afa/internal/database"
    "github.com/liaofeng/afa/internal/handlers"
)

func main() {
    db, err := database.InitDB("videos.db")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    r := gin.Default()
    
    // Enable CORS
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"*"}
    r.Use(cors.New(config))
    
    videoHandler := handlers.NewVideoHandler(db)

    api := r.Group("/api")
    {
        api.GET("/videos", videoHandler.ListVideos)
        api.POST("/videos", videoHandler.CreateVideo)
        api.PUT("/videos/:id", videoHandler.UpdateVideo)
        api.DELETE("/videos/:id", videoHandler.DeleteVideo)
    }

    r.Run(":8080")
}
