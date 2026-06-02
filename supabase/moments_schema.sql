-- 创建动态表（朋友圈/动态功能）
CREATE TABLE IF NOT EXISTS moments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 允许匿名读取（所有人都能看）
CREATE POLICY "Allow public read access" ON moments
  FOR SELECT USING (true);

-- 允许认证用户插入（通过 API 路由控制）
CREATE POLICY "Allow admin insert" ON moments
  FOR INSERT WITH CHECK (true);

-- 允许认证用户删除（通过 API 路由控制）
CREATE POLICY "Allow admin delete" ON moments
  FOR DELETE USING (true);
