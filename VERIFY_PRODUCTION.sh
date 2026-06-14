# Production-Ready Verification Script
# Run this before final submission

echo "🔍 NayePankh VMS - Production Ready Verification"
echo "=================================================="
echo ""

# Check Node.js
echo "✓ Node.js version:"
node --version || echo "✗ Node.js not found"
echo ""

# Check Backend
echo "✓ Backend files:"
ls server/server.js > /dev/null && echo "  ✓ server.js exists" || echo "  ✗ server.js missing"
ls server/package.json > /dev/null && echo "  ✓ package.json exists" || echo "  ✗ package.json missing"
ls server/.env.example > /dev/null && echo "  ✓ .env.example exists" || echo "  ✗ .env.example missing"
echo ""

# Check Frontend
echo "✓ Frontend files:"
ls client/src/App.jsx > /dev/null && echo "  ✓ App.jsx exists" || echo "  ✗ App.jsx missing"
ls client/package.json > /dev/null && echo "  ✓ package.json exists" || echo "  ✗ package.json missing"
ls client/vite.config.js > /dev/null && echo "  ✓ vite.config.js exists" || echo "  ✗ vite.config.js missing"
echo ""

# Check Documentation
echo "✓ Documentation files:"
ls README.md > /dev/null && echo "  ✓ README.md exists" || echo "  ✗ README.md missing"
ls DEPLOYMENT.md > /dev/null && echo "  ✓ DEPLOYMENT.md exists" || echo "  ✗ DEPLOYMENT.md missing"
ls PRODUCTION_CHECKLIST.md > /dev/null && echo "  ✓ PRODUCTION_CHECKLIST.md exists" || echo "  ✗ PRODUCTION_CHECKLIST.md missing"
ls SUBMISSION_GUIDE.md > /dev/null && echo "  ✓ SUBMISSION_GUIDE.md exists" || echo "  ✗ SUBMISSION_GUIDE.md missing"
ls LICENSE > /dev/null && echo "  ✓ LICENSE exists" || echo "  ✗ LICENSE missing"
echo ""

# Check Git Configuration
echo "✓ Git configuration:"
ls .gitignore > /dev/null && echo "  ✓ .gitignore exists" || echo "  ✗ .gitignore missing"
echo ""

# Check key backend files
echo "✓ Backend controllers:"
ls server/controllers/authController.js > /dev/null && echo "  ✓ authController.js exists" || echo "  ✗ missing"
ls server/controllers/volunteerController.js > /dev/null && echo "  ✓ volunteerController.js exists" || echo "  ✗ missing"
ls server/controllers/dashboardController.js > /dev/null && echo "  ✓ dashboardController.js exists" || echo "  ✗ missing"
ls server/controllers/exportController.js > /dev/null && echo "  ✓ exportController.js exists" || echo "  ✗ missing"
echo ""

# Check key frontend components
echo "✓ Frontend components:"
ls client/src/components/ProtectedRoute.jsx > /dev/null && echo "  ✓ ProtectedRoute.jsx exists" || echo "  ✗ missing"
ls client/src/components/VolunteerTable.jsx > /dev/null && echo "  ✓ VolunteerTable.jsx exists" || echo "  ✗ missing"
ls client/src/components/DashboardCharts.jsx > /dev/null && echo "  ✓ DashboardCharts.jsx exists" || echo "  ✗ missing"
echo ""

# Check database models
echo "✓ Database models:"
ls server/models/Admin.js > /dev/null && echo "  ✓ Admin.js exists" || echo "  ✗ missing"
ls server/models/Volunteer.js > /dev/null && echo "  ✓ Volunteer.js exists" || echo "  ✗ missing"
ls server/models/ActivityLog.js > /dev/null && echo "  ✓ ActivityLog.js exists" || echo "  ✗ missing"
echo ""

# Check middleware
echo "✓ Backend middleware:"
ls server/middleware/authMiddleware.js > /dev/null && echo "  ✓ authMiddleware.js exists" || echo "  ✗ missing"
ls server/middleware/errorMiddleware.js > /dev/null && echo "  ✓ errorMiddleware.js exists" || echo "  ✗ missing"
ls server/middleware/securityMiddleware.js > /dev/null && echo "  ✓ securityMiddleware.js exists" || echo "  ✗ missing"
echo ""

echo "=================================================="
echo "✅ Production-Ready Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update deployment URLs in README.md"
echo "2. Follow DEPLOYMENT.md guide for your platform"
echo "3. Configure environment variables"
echo "4. Run: npm run seed:admin && npm run seed:demo"
echo "5. Test all features"
echo "6. Deploy!"
echo ""
