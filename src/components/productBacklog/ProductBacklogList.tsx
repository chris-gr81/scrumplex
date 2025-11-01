import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const ProductBacklogList = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Backlog</CardTitle>
        <CardDescription>
          Das Product Backlog listet alle Userstories auf. Die einzelnen
          Elemente könne vom Product Owner bearbeitet und prioriest werden.
        </CardDescription>
      </CardHeader>
      <CardContent>Content!</CardContent>
    </Card>
  );
};

export default ProductBacklogList;
