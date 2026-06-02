-- 创建新闻表
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read news" ON news FOR SELECT USING (true);
CREATE POLICY "Allow admin insert news" ON news FOR INSERT WITH CHECK (true);

-- 创建部门表
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  light_color TEXT NOT NULL,
  text_color TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Allow admin insert departments" ON departments FOR INSERT WITH CHECK (true);

-- 创建活动表
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  participants TEXT,
  image_url TEXT,
  status TEXT NOT NULL,
  status_color TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow admin insert activities" ON activities FOR INSERT WITH CHECK (true);

-- 创建关于我们内容表
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read about" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow admin insert about" ON about_content FOR INSERT WITH CHECK (true);
