using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon.Geometry
{
    //TODO Add toString and Equals functions to all classes. Point needs == overload, at least.
    //Don't forget to document everything!
    /// <summary>
    /// A point in two-dimentional space.
    /// </summary>
    public class Point
    {
        private double x;
        private double y;

        public double X
        {
            get
            {
                return x;
            }

            set
            {
                x = value;
            }
        }

        public double Y
        {
            get
            {
                return y;
            }

            set
            {
                y = value;
            }
        }

        public Point(double xLocation = 0, double yLocation = 0)
        {
            X = xLocation;
            Y = yLocation;
        }

        //TEST THIS!!! This function will become very important when constructing reflect methods for all of the other entities.
        public Point Reflect(Line mirror)
        {
            double invertSlope = 1 / -mirror.Slope;
            Line trace = new Line(this, invertSlope);
            Point midway = trace.Intersect(mirror);
            double xDistance = 2*(midway.X - X);
            double yDistance = 2*(midway.Y - Y);
            return new Point(X + xDistance, Y + yDistance);
        }

        public Point Rotate(Point origin, double radians)
        {
            //Translate it to focus it on (0,0) since that makes things a little easier.
            double translatedX = X - origin.X;
            double translatedY = Y - origin.Y;
            double translatedRotatedX = (translatedX * Math.Cos(radians)) - (translatedY * Math.Sin(radians));
            double translatedRotatedY = (translatedX * Math.Sin(radians)) + (translatedY * Math.Cos(radians));
            return new Point(translatedRotatedX + origin.X, translatedRotatedY + origin.y);

        }

        //I don't think this meets conventions for writing equals object. A link to these conventions is listed when you type Equals and tab twice (which inserts the code snippit)
        /// <summary>
        /// Checks to see if another point is the same as this one.
        /// </summary>
        /// <param name="obj">The point to check alongside the one this function is called on</param>
        /// <returns>True if the points are at the same place; otherwise, false.</returns>
        public bool Equals(Point obj)
        {

            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }
            
            if (X == obj.X && Y == obj.Y)
                return true;
            else
                return false;
        }

        public override string ToString()
        {
            return "(" + X + "," + Y + ")";
        }

    }

    /*Add a "below line" and "above line" function; that will come in handy for triangles!*/
    /*Also add reflect functions for these*/

    /// <summary>
    /// A simple, straight line.
    /// </summary>
    public class Line
    {
        private double slope;
        private double intercept;

        public double Slope
        {
            get
            {
                return slope;
            }

            set
            {
                slope = value;
            }
        }

        public double Intercept
        {
            get
            {
                return intercept;
            }

            set
            {
                intercept = value;
            }
        }

        /// <summary>
        /// Creates the simplist line there is.
        /// </summary>
        /// <param name="slope"></param>
        /// <param name="yIntercept"></param>
        public Line(double slope = 1, double yIntercept = 0)
        {
            Slope = slope;
            Intercept = yIntercept;
        }

        public Line(Point point, double Slope = 1)
        {
            Slope = slope;
            Intercept = point.Y - (Slope * point.X);
        }

        /// <summary>
        /// Returns the function's value at a given point. Think f(x) = ...
        /// </summary>
        /// <param name="x">The value with which to evaluate the function</param>
        /// <returns>The corresponding y value for x</returns>
        public virtual double Evaluate(double x)
        {
            return (slope * x) + Intercept;
        }

        public virtual bool PointIsOnLine(Point test)
        {
            if (test.Y == (test.X * Slope) + Intercept) //If y=mx + b
                return true;
            else
                return false;
        }

        public Point Intersect(Line other) 
        {
            //y = mx + b = nx + c
            //mx - nx = c - b
            //x(m-n) = c - b
            //x = (c - b) / (m - n)
            if (Slope == other.Slope) //If they're parallel (We have to test this or else 
            {
                if (Intercept == other.Intercept) //If they're the same line
                {
                    //TODO Even though they're the same line, test to make sure their endpoints don't exclude each other. only 2 total tests should be necessary; 1 for the endpoint of each line
                    return new Point(double.PositiveInfinity, double.PositiveInfinity); //I guess this is better than NaN
                }
                else
                    return new Point(double.PositiveInfinity, double.PositiveInfinity);
            }
            double potentialIntersectX = (other.Intercept - Intercept) / (Slope - other.Slope);
            Point potentialIntersect = new Point(potentialIntersectX, Evaluate(potentialIntersectX));
            if (PointIsOnLine(potentialIntersect) && other.PointIsOnLine(potentialIntersect))
            { //This sometimes returns false; example, line secgments which don't extend to cover everything.
                return potentialIntersect;
            }
            else
                return new Point(double.NaN, double.NaN);
        }
    }

    /// <summary>
    /// A straight line of finite length.
    /// </summary>
    public class LineSegment : Line
    {
        private Point p1;
        private Point p2;
        private bool p1Inclusive;
        private bool p2Inclusive;

        public Point P1
        {
            get
            {
                return p1;
            }

            set
            {
                p1 = value;
                Update();
            }
        }

        public Point P2
        {
            get
            {
                return p2;
            }

            set
            {
                p2 = value;
                Update();
            }
        }

        /// <summary>
        /// Whether or not point 1 is on the line (Filled circle vs empty circle on graphs)
        /// </summary>
        public bool P1Inclusive
        {
            get
            {
                return p1Inclusive;
            }

            set
            {
                p1Inclusive = value;
            }
        }
        
        /// <summary>
        /// Whether or not point 2 is on the line (Filled circle vs empty circle on graphs)
        /// </summary>
        public bool P2Inclusive
        {
            get
            {
                return p2Inclusive;
            }

            set
            {
                p2Inclusive = value;
            }
        }

        public LineSegment(Point point1, Point point2, bool inclusive1 = true, bool inclusive2 = true)
        {
            P1 = point1;
            P2 = point2;
            P1Inclusive = inclusive1;
            P2Inclusive = inclusive2;

            Update(); //Take care of slope and Y intercept.
        }

        public LineSegment(double x1 = 0, double x2 = 0, double y1 = 0, double y2 = 0, bool inc1 = true, bool inc2 = true) : this(new Point(x1, y1), new Point(x2, y2), inc1, inc2) { }

        public LineSegment(Point point1, double slope = 1, bool max = true, bool inc = true)
        {
            P1 = point1;
            double p2XSign;
            double p2YSign;
            //Sadly, due to the lack of two points, we cannot use UpdateSlope()
            if (slope == double.NaN)
                p2XSign = point1.X; //Vertical line
            else if (max)
                p2XSign = double.NegativeInfinity;
            else
                p2XSign = double.PositiveInfinity;


            if (slope > 0)
                p2YSign = double.PositiveInfinity;
            else if (slope < 0)
                p2YSign = double.NegativeInfinity;
            else if (slope == 0)
                p2YSign = 0;
            else
                p2YSign = double.NaN;

            P1 = point1;
            P2 = new Point(p2XSign, p2YSign);


            P1Inclusive = inc;
            P2Inclusive = true;
            Slope = slope;
            UpdateYIntercept();
        }

        /*LINE CHARACTERISTIC MANAGEMENT*/
        
        /// <summary>
        /// Automatically determines and sets the slope and y interecept based on the segment's endpoints.
        /// </summary>
        private void Update()
        {
            //UpdateSlope();
            UpdateYIntercept(); //This calls UpdateSlope anyway... But it's very odd that it has to do this. I'll look into this later.
        }
        
        /// <summary>
        /// Updates the slope of the line to match what it should be given the segment's endpoints.
        /// </summary>
        private void UpdateSlope()
        {
            /*ONE ENDED SEGMENTS*/

            //If we have infinite or NaN values, then we're pretty much relying on the caller to know what they're doing.
            //These conditionals assume that if either point's x or y is infinite that its corresponding other location is also weird.
            //This still needs to be tested to make sure it works, since these are already pertaining to odd corner cases.
            if ((double.IsInfinity(P1.X) || double.IsInfinity(P2.X)) && !(double.IsInfinity(P1.Y) || double.IsInfinity(P2.Y)))
            { //Horizontal infinity
                Slope = 0;
                return;
            }
            else if(!(double.IsInfinity(P1.X) || double.IsInfinity(P2.X)) && (double.IsInfinity(P1.Y) || double.IsInfinity(P2.Y)))
            { //Vertical infinity
                Slope = double.NaN;
                return;
            }
            else if(double.IsInfinity(P1.X) || double.IsInfinity(P2.X) || double.IsInfinity(P1.Y) || double.IsInfinity(P2.Y))
            {
                return; //We cannot determine the slope from the information given.
            }

            /*TWO ENDED SEGMENTS*/
            if (P1.Y - P2.Y == 0)
            {
                Slope = double.NaN; //Vertical segment
                return;
            }

            Slope = (P1.X - P2.X) / (P1.Y - P2.Y);
            
        }
        
        /// <summary>
        /// Determines what should be the Y intercept based on the points given for this line segment.
        /// Weird suboptimality; this doesn't work without calling UpdateSlope. Odd.
        /// </summary>
        private void UpdateYIntercept()
        {
            UpdateSlope(); //This has to be called for whatever reason.
            if(Slope == double.NaN) //If it's an asymptote
            {
                if(P1.X == 0 || P2.X == 0)//If the segment is on and parallel to the origin
                {
                    Intercept = double.PositiveInfinity;
                    return;
                }
                else
                {
                    Intercept = double.NaN;
                    return;
                }
            }

        if (Slope == 0)
            Intercept = p1.Y;
        //y = mx + b
        //b = y - (mx)
        Intercept = p1.Y - (Slope * p1.X);
        
        }
        
        /*OTHER UTILITIES*/

        /// <summary>
        /// Determines the length of the line segment.
        /// I don't know if this will work for line segments with only one endpoint.
        /// </summary>
        /// <returns>The distance between the line segment's endpoints.</returns>
        public double Measure()
        {
            double width = p2.X - p1.X;
            double height = p2.Y - p1.Y;
            return Math.Sqrt((width * width) + (height * height));
        }

        /// <summary>
        /// Determines if a point lands on this line segment
        /// </summary>
        /// <param name="test">The point to examine in relation to this line segment</param>
        /// <returns>True if the point is on the segment, otherwise false</returns>
        public override bool PointIsOnLine(Point test) 
        {
            //If it's equal to the endpoints (and the endpoint allows things to be equal to it)
            //Maybe this could move to the else block at the very end of the function and save some work in some cases.
            if(P1.Equals(test))
            {
                if (P1Inclusive)
                    return true;
                else
                    return false;
            }
            if(P2.Equals(test))
            {
                if (P2Inclusive)
                    return true;
                else
                    return false;
            }

            //Be wary of nested conditionals :3 And by this I mean I repeated myself a couple of times
            //Maybe you could do this more quickly in the future once you integrate the rectangle class. Just make a rectangle and check to see if the point is inside of it.
            if (test.Y == (test.X * Slope) + Intercept) //If y=mx + b
                if(P1.X < P2.X) 
                {
                    if (test.X < P2.X && test.X > P1.X) //Test for domain
                    {
                        if (P1.Y < P2.Y)
                        {
                            if (test.Y < P2.Y && test.Y > P1.Y) //Test for range
                                return true;
                            else
                                return false;
                        }
                        else
                        {
                            if (test.Y > P2.Y && test.Y < P1.Y) //Test for range
                                return true;
                            else
                                return false;
                        }
                    }
                    else
                        return false;
                }
                else
                {
                    if (test.X > P2.X && test.X < P1.X) //Test for domain
                    {
                        if (P1.Y < P2.Y)
                        {
                            if (test.Y < P2.Y && test.Y > P1.Y) //Test for range
                                return true;
                            else
                                return false;
                        }
                        else
                        {
                            if (test.Y > P2.Y && test.Y < P1.Y) //Test for range
                                return true;
                            else
                                return false;
                        }
                    }
                    else
                        return false;
                }
            else
                return false;
        }

        public override double Evaluate(double x)
        {
            Point resultant = new Point(x,(Slope * x) + Intercept);
            if (PointIsOnLine(resultant))
                return resultant.Y;
            else
                return double.NaN;
        }
    }

    /*Agenda: 
     Circle Class
     Rectangle Class
     Triangle Class
     X-Sided Shape class...
     For these there, add functions for area, angles, transformations, and etcetera. Should be a fairly good sized project.
     Don't forget that everything you do should be constructed out of points! That way, you can do transformations such as reflections easily.
     */

    public abstract class Shape
    {
        /// <summary>
        /// Returns the area of the shape in units^2
        /// </summary>
        /// <returns>The shape's area</returns>
        public abstract double Area();
        /// <summary>
        /// Reflects a shape
        /// </summary>
        /// <param name="mirror">The line to reflect the shape over</param>
        /// <returns>A reflected version of the shape</returns>
        public abstract Shape Reflect(Line mirror);
        /// <summary>
        /// Rotates a point a certain amount around a point.
        /// </summary>
        /// <param name="origin">The point to rotate the shape around.</param>
        /// <param name="radians">The amount by which to rotate the shape, starting with 0 = right and moving counter-clockwise</param>
        /// <returns>A rotated version of the shape</returns>
        public abstract Shape Rotate(Point origin, double radians); //Maybe this should use the circle class?
        /// <summary>
        /// Checks to see if a point falls within a shape's boundries.
        /// </summary>
        /// <param name="point">The point to examine in relation to this shape</param>
        /// <returns>True if the point lies within the shape's perimeter</returns>
        public abstract bool PointLiesWithin(Point point);
        /// <summary>
        /// Checks to see if a point is on the perimeter of the shape
        /// </summary>
        /// <param name="point">The point to examine in relation to this shape</param>
        /// <returns>Whether or not the point is exactly on the shape's perimeter</returns>
        public abstract bool PointLiesOn(Point point);
    }

    public class Circle : Shape
    {
        private Point center;
        private double radius;

        public Point Center
        {
            get
            {
                return center;
            }

            set
            {
                center = value;
            }
        }

        public double Radius
        {
            get
            {
                return radius;
            }

            set
            {
                radius = value;
            }
        }

        public Circle(Point p, double rad = 1)
        {
            Center = p;
            Radius = rad;
        }

        public Circle(double rad = 1) : this(new Point(), rad) { }

        public override double Area()
        {
            return Math.PI * Math.Pow(Radius, 2);
        }

        public override Shape Reflect(Line mirror)
        {
            return new Circle(Center.Reflect(mirror), Radius);
        }

        public override Shape Rotate(Point origin, double radians)
        {
            throw new NotImplementedException();
        }

        public override bool PointLiesWithin(Point point)
        {
            LineSegment distance = new LineSegment(Center, point);
            if (distance.Measure() < Radius)
                return true;
            else
                return false;
        }

        public override bool PointLiesOn(Point point)
        {
            throw new NotImplementedException();
        }

        /* ROTATION DICTIONARY */
        public const double HALF = Math.PI; //180 degrees
        public const double THIRD = (2 * Math.PI) / 3; //120 degrees
        public const double QUARTER = Math.PI / 2; //90 degrees
        public const double SIXTH = Math.PI / 3; //60 degrees
        public const double EIGTH = Math.PI / 4; //45 degrees
    }

}