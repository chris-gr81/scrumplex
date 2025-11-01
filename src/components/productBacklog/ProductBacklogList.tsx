import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Ftab,
  FtabBody,
  FtabCell,
  FtabHead,
  FtabHeader,
  FtabRow,
} from "../ui/ftab";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const ProductBacklogList = () => {
  const toggleRowExpansion = (e: React.MouseEvent<SVGSVGElement>) => {
    const targetID = e.currentTarget.dataset.toggleId;
    console.log(targetID);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Backlog</CardTitle>
        <CardDescription>
          Das Product Backlog listet alle Userstories auf. Die einzelnen
          Elemente könne vom Product Owner bearbeitet und prioriest werden.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <span className="text-xs">Story anlegen</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Ftab>
          <FtabHeader>
            <FtabRow>
              <FtabHead className="truncate basis-[5%]">
                <ChevronRight className="cursor-pointer text-foreground/50 hover:text-foreground" />
              </FtabHead>
              <FtabHead className="truncate basis-[40%]">Story-Name</FtabHead>
              <FtabHead className="truncate basis-[11%]">Erstellt am:</FtabHead>
              <FtabHead className="truncate basis-[11%]">INVEST in %</FtabHead>
              <FtabHead className="truncate basis-[11%]">Storypoints</FtabHead>
              <FtabHead className="truncate basis-[11%]">Priorität</FtabHead>
              <FtabHead className="truncate basis-[11%]">Status</FtabHead>
            </FtabRow>
          </FtabHeader>
          <FtabBody>
            <FtabRow data-row-id="123" subRow={"Als Nutzer möchte ich..."}>
              <FtabCell className="truncate basis-[5%]">
                <ChevronRight
                  data-toggle-id="123"
                  className="cursor-pointer text-foreground/50 hover:text-foreground"
                  onClick={toggleRowExpansion}
                />
              </FtabCell>
              <FtabCell className="truncate basis-[40%]">
                Ein Testprojekt
              </FtabCell>
              <FtabCell className="truncate basis-[11%]">01.11.2025</FtabCell>
              <FtabCell className="truncate basis-[11%]">80%</FtabCell>
              <FtabCell className="truncate basis-[11%]">5</FtabCell>
              <FtabCell className="truncate basis-[11%]">Icebox</FtabCell>
              <FtabCell className="truncate basis-[11%]">Offen</FtabCell>
            </FtabRow>
          </FtabBody>
        </Ftab>
      </CardContent>
    </Card>
  );
};

export default ProductBacklogList;
