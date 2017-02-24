using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon.Geometry
{


    /// <summary>
    /// A fully enclosed shape.
    /// </summary>
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
        /// Rotates a shape a certain amount around a point. Beware, for sometimes this function returns a number which is an extremely small amount off due to rounding shenanigans.
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
        public abstract bool LiesWithin(Point point);
        /// <summary>
        /// Checks to see if a point is on the perimeter of the shape
        /// </summary>
        /// <param name="point">The point to examine in relation to this shape</param>
        /// <returns>Whether or not the point is exactly on the shape's perimeter</returns>
        public abstract bool LiesOn(Point point);

        public abstract Point[] Intersections(Line intersector);

        public abstract Point[] Intersections(Shape intersector);
    }

    public class Circle : Shape // I know that this should be an extension of ellipse but I can't figure those things out for the life of me.
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

        /// <summary>
        /// Returns the area of the circle in units^2
        /// </summary>
        /// <returns>The circle's area</returns>
        public override double Area()
        {
            return Math.PI * Math.Pow(Radius, 2);
        }

        /// <summary>
        /// Reflects a circle
        /// </summary>
        /// <param name="mirror">The line to reflect the circle over</param>
        /// <returns>A reflected version of the circle</returns>
        public override Shape Reflect(Line mirror)
        {
            return new Circle(Center.Reflect(mirror), Radius);
        }

        /// <summary>
        /// Rotates a circle a certain amount around a point. Beware, for sometimes this function returns a circle which is an extremely small amount off due to rounding shenanigans.
        /// </summary>
        /// <param name="origin">The point to rotate the circle around.</param>
        /// <param name="radians">The amount by which to rotate the circle, starting with 0 = right and moving counter-clockwise</param>
        /// <returns>A rotated version of the circle</returns>
        public override Shape Rotate(Point origin, double radians)
        {
            return new Circle(center.Rotate(origin, radians), Radius);
        }

        /// <summary>
        /// Checks to see if a point falls within this circle's boundries.
        /// </summary>
        /// <param name="point">The point to examine in relation to this circle</param>
        /// <returns>True if the point lies within the shape's perimeter</returns>
        public override bool LiesWithin(Point point)
        {
            LineSegment distance = new LineSegment(Center, point);
            if (distance.Measure() < Radius)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Checks to see if a point is on the circumference of the circle
        /// </summary>
        /// <param name="point">The point to examine in relation to this circle</param>
        /// <returns>Whether or not the point is exactly on the circle's perimeter</returns>
        public override bool LiesOn(Point point)
        {
            LineSegment distance = new LineSegment(Center, point);
            if (distance.Measure() == Radius)
                return true;
            else
                return false;
        }

        /// <summary>
        /// ASDJIFOASOIJOIFWAEOINROPAWIJEROPINROWAEIN!!! I dunno how to do this. I'll get to it later.
        /// </summary>
        /// <param name="intersector">The line to check for intersections with</param>
        /// <returns>The points of intersection</returns>
        public override Point[] Intersections(Line intersector)
        {
            throw new NotImplementedException();
        }

        public override Point[] Intersections(Shape intersector)
        {
            if(intersector.GetType() == typeof(Circle))
            {
                Circle other = (Circle)intersector;
                LineSegment distanceBetweenPoints = new LineSegment(center, other.Center);
                if (distanceBetweenPoints.Measure() < (Radius + other.Radius))
                {
                    return new Point[0]; //There aren't any intersections
                }
                else if(distanceBetweenPoints.Measure() == (Radius + other.Radius))
                {

                }
            }
            throw new NotImplementedException();
        }

        /* ROTATION DICTIONARY */
        public const double HALF = Math.PI; //180 degrees
        public const double THIRD = (2 * Math.PI) / 3; //120 degrees
        public const double QUARTER = Math.PI / 2; //90 degrees
        public const double SIXTH = Math.PI / 3; //60 degrees
        public const double EIGTH = Math.PI / 4; //45 degrees
    }

    public class Ellipse : Shape
    {
        public override double Area()
        {
            throw new NotImplementedException();
        }

        public override Point[] Intersections(Shape intersectors)
        {
            throw new NotImplementedException();
        }

        public override Point[] Intersections(Line intersector)
        {
            throw new NotImplementedException();
        }

        public override bool LiesOn(Point point)
        {
            throw new NotImplementedException();
        }

        public override bool LiesWithin(Point point)
        {
            throw new NotImplementedException();
        }

        public override Shape Reflect(Line mirror)
        {
            throw new NotImplementedException();
        }

        public override Shape Rotate(Point origin, double radians)
        {
            throw new NotImplementedException();
        }
    }

    /// <summary>
    /// A fully enclosed shape shape with three or more sides.
    /// </summary>
    public abstract class Polygon : Shape
    {
        private Corner[] corners;

        /// <summary>
        /// The number of corners, or sides, in a polygon.
        /// </summary>
        /// <returns>The number of corners, or sides, in a shape.</returns>
        public int sides()
        {
            return corners.Length;
        }

        /// <summary>
        /// Returns the line segments which make up the polygon's perimeter
        /// </summary>
        /// <returns></returns>
        public Line[] LineConnectors()
        {
            Line[] borders = new Line[sides()];
            for (int i = 0; i < sides() - 1; i++)
            {
                borders[i] = new LineSegment(corners[i], corners[i + 1]);
            }
            borders[sides() - 1] = new LineSegment(corners[0], corners[sides() - 1]);
            return borders;
        }

        /// <summary>
        /// Determines whether a given point is within the polygon
        /// </summary>
        /// <param name="point">See if this point is inside of the </param>
        /// <returns><c>true</c> if the point lies within the polygon (not on the polygon!)</returns>
        public override bool LiesWithin(Point point)
        {
            // [Outside] | [Inside] | [Outside]
            Line insideOutsideFlipper = new Line(0, point.Y);
            List<Point> flips = new List<Point>();
            Line[] boundries = LineConnectors();
            for (int i = 0; i < sides(); i++)
            {
                Point intersection = insideOutsideFlipper.Intersect(boundries[i]);
                if (intersection.IsWorkablePoint())
                    flips.Add(intersection);
            }
            for (int i = 0; i < flips.Count - 1; i++)
            {
                if (flips[i].X < point.X && flips[i + 1].X > point.X)
                {// If we are between two points
                    if (i % 2 == 1)
                    {// If the point to the left of us is an odd indexed point, then we are on the inside; otherwise, we are on the outside.
                        return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// Determines whether a point falls on the perimeter of a polygon
        /// </summary>
        /// <param name="point">The point to examine in relation to the polygon</param>
        /// <returns><c>true</c> if the point is exactly on the border of the shape.</returns>
        public override bool LiesOn(Point point)
        {
            foreach (Line border in LineConnectors())
            {
                if (border.OnLine(point))
                    return true;
            }
            return false;
        }

        public override Point[] Intersections(Shape intersector)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Finds all of the points at which shapes touch each other.
        /// Be wary! Points with infinite values mean that the shapes never actually crossed each other, but they were exactly touching!
        /// </summary>
        /// <param name="intersector">The line to cross through this polygon</param>
        /// <param name="recordInfiniteIntersection">Whether or not to return a placeholder point with NaN for values when there is no intersection between a border and the line.</param>
        /// <param name="recordNoIntersection">Whether or not to return a placeholder point to represent perfectly adjacent parallel lines.</param>
        /// <returns>All of the intersections between this shape and the line.</returns>
        public Point[] Intersections(Line intersector, bool recordInfiniteIntersection = true, bool recordNoIntersection = false)
        {
            Line[] myBorders = LineConnectors();
            List<Point> intersectionPoints = new List<Point>();
            for (int i = 0; i < myBorders.Length; i++)
            {
                Point currentDummy = myBorders[i].Intersect(intersector);
                if (!(double.IsNaN(currentDummy.X) || double.IsNaN(currentDummy.Y)) || recordNoIntersection)
                { //If they aren't the same line (you can succeed anyway if we've been told not to check for this)
                    if (!(double.IsInfinity(currentDummy.X) || double.IsInfinity(currentDummy.Y)) || recordInfiniteIntersection)
                    { //If they aren't the same line (you can succeed anyway if we've been told not to check for this)
                        intersectionPoints.Add(currentDummy);
                    }
                }
            }
            return intersectionPoints.ToArray();
        }

        /// <see cref="Intersections(Line, bool, bool)"/>
        public override Point[] Intersections(Line intersector)
        {
            return Intersections(intersector, true, false);
        }

        public int InteriorAngleSum()
        {
            return 180 * (sides() - 2);
        }

        //InteriorAngle() is not necessarily a good thing to mandate because not all shapes will be equalateral
    }

    //TODO: Add trigonometry to the triangle class!
    public class Triangle : Polygon
    {
        public override double Area()
        {
            throw new NotImplementedException();
        }

        public override Shape Reflect(Line mirror)
        {
            throw new NotImplementedException();
        }

        public override Shape Rotate(Point origin, double radians)
        {
            throw new NotImplementedException();
        }
    }

    public class Quadrilateral : Polygon
    {
        public override double Area()
        {
            throw new NotImplementedException();
        }

        public override Shape Reflect(Line mirror)
        {
            throw new NotImplementedException();
        }

        public override Shape Rotate(Point origin, double radians)
        {
            throw new NotImplementedException();
        }
    }
}