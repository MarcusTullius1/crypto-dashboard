import React from "react";
import "./NewsBlock.css";

export default function NewsBlock({ news }) {
  return (
    <div className="news-container">
      <h2 className="news-title">Market News</h2>

      {news.length === 0 && (
        <p className="news-empty">Новостей пока нет</p>
      )}

      <div className="news-list">
        {news.map((item, index) => (
          <div key={index} className="news-item">
            <div className="news-header">
              <h3 className="news-item-title">{item.title}</h3>
              <span className="news-date">{item.date}</span>
            </div>

            <p className="news-description">{item.description}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              Подробнее →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
