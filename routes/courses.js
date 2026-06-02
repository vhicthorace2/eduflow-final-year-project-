const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
  getInstructorCourses
} = require('../controllers/courseController');
const auth = require('../middleware/auth');
const { isInstructorOrAdmin, isInstructor } = require('../middleware/rbac');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/enroll/:id', auth, enrollCourse);
router.get('/my-courses', auth, getMyCourses);

// Instructor only routes
router.post('/', auth, isInstructor, createCourse);
router.put('/:id', auth, isInstructorOrAdmin, updateCourse);
router.delete('/:id', auth, isInstructorOrAdmin, deleteCourse);
router.get('/instructor-courses', auth, isInstructor, getInstructorCourses);

module.exports = router;
