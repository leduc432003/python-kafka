class Article:
    def __init__(self, title, summary, content, image):
        self.title = title
        self.content = content
        self.summary = summary
        self.image = image

    
    def to_dict(self):
        return {
            "title": self.title,
            "summary": self.summary,
            "content": self.content,
            "image": self.image
        }