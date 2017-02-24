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
            double xDistance = 2 * (midway.X - X);
            double yDistance = 2 * (midway.Y - Y);
            return new Point(X + xDistance, Y + yDistance);
        }

        /// <summary>
        /// Rotates a point a certain amount around another point. Beware, for sometimes this function returns a number which is an extremely small amount off due to rounding shenanigans.
        /// </summary>
        /// <param name="origin">The fixed point to rotate this point around.</param>
        /// <param name="radians">The amount by which to rotate the point, starting with 0 = right and moving counter-clockwise</param>
        /// <returns>A point representing where this point would be if it were rotated.</returns>
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

        public bool IsWorkablePoint()
        {
            bool xCheck = X == double.NaN || double.IsInfinity(X);
            bool yCheck = X == double.NaN || double.IsInfinity(Y);
            if(xCheck || yCheck)
                return false;
            return true;
        }

    }

    /// <summary>
    /// A point with an associated interior angle, for use in polygons.
    /// </summary>
    public class Corner : Point
    {
        private double angle;

        /// <summary>
        /// The interior angle of the polygon at this corner.
        /// </summary>
        public double Angle
        {
            get
            {
                return angle;
            }

            set
            {
                angle = value;
            }
        }

        /// <summary>
        /// A corner point of a polygon.
        /// </summary>
        /// <param name="xLocation">The corner's horizontal position.</param>
        /// <param name="yLocation">The corner's vertical position.</param>
        /// <param name="cornerAngle">The interior angle of the polygon at this point.</param>
        public Corner(double xLocation = 0, double yLocation = 0, double cornerAngle = Math.PI / 2) : base(xLocation, yLocation)
        {
            Angle = cornerAngle;
        }

        /// <summary>
        /// An adaptation of a point to be used as a polygon endpoint.
        /// </summary>
        /// <param name="model">The location of the corner</param>
        /// <param name="cornerAngle">The interior angle of the polygon at this corner</param>
        public Corner(Point model, double cornerAngle = Math.PI / 2)
        {
            X = model.X;
            Y = model.Y;
            Angle = cornerAngle;
        }

        public new Corner Reflect(Line mirror)
        {
            Point reflected = base.Reflect(mirror);
            return new Corner(reflected, Angle);
        }

        public override string ToString()
        {
            return "(" + X + "," + Y + ") " + angle + " radians";
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

        public virtual bool OnLine(Point test)
        {
            if (test.Y == (test.X * Slope) + Intercept) //If y=mx + b
                return true;
            else
                return false;
        }

        //Determines if a point lies below a line.
        public bool BelowLine(Point test)
        {
            if (Evaluate(test.X) < test.Y)
                return true;
            else
                return false;
        }

        public bool AboveLine(Point test)
        {
            if (Evaluate(test.X) > test.Y)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Determines where this straight line and another touch each other.
        /// </summary>
        /// <param name="other">The line to collide with this one.</param>
        /// <returns>The point of intersection, if the two lines cross. If the lines touch each other, returns a point infinite values, or NaN if they never touch.</returns>
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
            if (OnLine(potentialIntersect) && other.OnLine(potentialIntersect))
            { //This sometimes returns false; example, line secgments which don't extend to cover everything.
                return potentialIntersect;
            }
            else
                return new Point(double.NaN, double.NaN);
        }

        /// <summary>
        /// Follows a line for a certain distance and returns the location of where you end up.
        /// </summary>
        /// <param name="startX">The starting position to trace from, in terms of X</param>
        /// <param name="distance">The distance to trace along the line.</param>
        /// <returns>A point <c>distance</c> away from the funtion's value at <c>startX</c> along the line.</returns>
        public Point Trace(double startX = 0, double distance = 0)
        {
            //I've stared at this for like 15 minutes and I'm drawing a blank. This is getting absurd
            //distance^2 = change in x^2 + change in y^2
            //change in y = slope * change in x
            //distance^2 = (changeInX^2) + (slope*changeInX)^2
            //where do I go from here...
            throw new NotImplementedException();

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
            else if (!(double.IsInfinity(P1.X) || double.IsInfinity(P2.X)) && (double.IsInfinity(P1.Y) || double.IsInfinity(P2.Y)))
            { //Vertical infinity
                Slope = double.NaN;
                return;
            }
            else if (double.IsInfinity(P1.X) || double.IsInfinity(P2.X) || double.IsInfinity(P1.Y) || double.IsInfinity(P2.Y))
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
            if (Slope == double.NaN) //If it's an asymptote
            {
                if (P1.X == 0 || P2.X == 0)//If the segment is on and parallel to the origin
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
        public override bool OnLine(Point test)
        {
            //If it's equal to the endpoints (and the endpoint allows things to be equal to it)
            //Maybe this could move to the else block at the very end of the function and save some work in some cases.
            if (P1.Equals(test))
            {
                if (P1Inclusive)
                    return true;
                else
                    return false;
            }
            if (P2.Equals(test))
            {
                if (P2Inclusive)
                    return true;
                else
                    return false;
            }

            //Be wary of nested conditionals :3 And by this I mean I repeated myself a couple of times
            //Maybe you could do this more quickly in the future once you integrate the rectangle class. Just make a rectangle and check to see if the point is inside of it.
            if (test.Y == (test.X * Slope) + Intercept) //If y=mx + b
                if (P1.X < P2.X)
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
            Point resultant = new Point(x, (Slope * x) + Intercept);
            if (OnLine(resultant))
                return resultant.Y;
            else
                return double.NaN;
        }

        /// <summary>
        /// Determines the midpoint of the line segent.
        /// </summary>
        /// <returns>The line segment's midpoint</returns>
        public Point Midpoint()
        {
            double midX = P1.X + ((P2.X - P1.X) / 2);
            double midY = P1.Y + ((P2.Y - P1.Y) / 2);
            return new Point(midX, midY);
        }
    }
}
