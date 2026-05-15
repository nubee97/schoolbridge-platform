-- SchoolBridge Functional MVP seed data
-- Run after schema.sql.

WITH s AS (
  INSERT INTO schools (name, country, city, address, subscription_status)
  VALUES ('Bridgefield International School', 'Nigeria', 'Lagos', 'Victoria Island, Lagos', 'trial')
  RETURNING id
), admin AS (
  INSERT INTO profiles (school_id, full_name, email, phone, role)
  SELECT id, 'Amina Bello', 'admin@bridgefield.school', '+2348000000001', 'admin' FROM s
  RETURNING id, school_id
), teacher AS (
  INSERT INTO profiles (school_id, full_name, email, phone, role)
  SELECT school_id, 'Ms. Ada Okoro', 'teacher@bridgefield.school', '+2348000000002', 'teacher' FROM admin
  RETURNING id, school_id
), parent1 AS (
  INSERT INTO profiles (school_id, full_name, email, phone, role)
  SELECT school_id, 'Mrs. Okafor', 'parent@bridgefield.school', '+2348000000003', 'parent' FROM admin
  RETURNING id, school_id
), parent2 AS (
  INSERT INTO profiles (school_id, full_name, email, phone, role)
  SELECT school_id, 'Mr. Johnson', 'johnson.parent@bridgefield.school', '+2348000000004', 'parent' FROM admin
  RETURNING id, school_id
), c1 AS (
  INSERT INTO classes (school_id, teacher_id, name, section)
  SELECT school_id, id, 'Nursery 2', 'Blue' FROM teacher
  RETURNING id, school_id, teacher_id
), c2 AS (
  INSERT INTO classes (school_id, teacher_id, name, section)
  SELECT school_id, teacher_id, 'Primary 1', 'A' FROM c1
  RETURNING id, school_id, teacher_id
), st1 AS (
  INSERT INTO students (school_id, class_id, first_name, last_name, gender, date_of_birth, photo_url)
  SELECT school_id, id, 'Maya', 'Okafor', 'Female', '2021-04-12', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=80' FROM c1
  RETURNING id, school_id, class_id
), st2 AS (
  INSERT INTO students (school_id, class_id, first_name, last_name, gender, date_of_birth, photo_url)
  SELECT school_id, id, 'David', 'Johnson', 'Male', '2020-09-08', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=500&q=80' FROM c2
  RETURNING id, school_id, class_id
), link1 AS (
  INSERT INTO student_parents (student_id, parent_user_id, relationship, is_primary_guardian)
  SELECT st1.id, parent1.id, 'Mother', true FROM st1, parent1
), link2 AS (
  INSERT INTO student_parents (student_id, parent_user_id, relationship, is_primary_guardian)
  SELECT st2.id, parent2.id, 'Father', true FROM st2, parent2
), p1 AS (
  INSERT INTO feed_posts (school_id, student_id, class_id, author_id, post_type, title, content, visibility)
  SELECT st1.school_id, st1.id, st1.class_id, teacher.id, 'photo', 'Creative art session', 'Maya participated actively during creative painting today and showed excellent teamwork with classmates.', 'student_only'
  FROM st1, teacher
  RETURNING id, school_id
), m1 AS (
  INSERT INTO post_media (post_id, file_url, file_type, caption)
  SELECT id, 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80', 'image', 'Art class activity' FROM p1
), p2 AS (
  INSERT INTO feed_posts (school_id, class_id, author_id, post_type, title, content, visibility)
  SELECT c1.school_id, c1.id, teacher.id, 'homework', 'Reading homework', 'Please practice pages 12-14 with your child tonight. Parents can leave a comment if support is needed.', 'class'
  FROM c1, teacher
), p3 AS (
  INSERT INTO feed_posts (school_id, student_id, class_id, author_id, post_type, title, content, visibility)
  SELECT st2.school_id, st2.id, st2.class_id, teacher.id, 'report', 'Weekly progress note', 'David showed improvement in counting exercises and responded well during group learning.', 'student_only'
  FROM st2, teacher
)
INSERT INTO attendance (school_id, student_id, class_id, date, status, marked_by, note)
SELECT st1.school_id, st1.id, st1.class_id, CURRENT_DATE, 'present', teacher.id, 'Arrived on time' FROM st1, teacher
UNION ALL
SELECT st2.school_id, st2.id, st2.class_id, CURRENT_DATE, 'late', teacher.id, 'Arrived 10 minutes late' FROM st2, teacher;
