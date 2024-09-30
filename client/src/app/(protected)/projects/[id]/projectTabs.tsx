import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Grid3X3, List, Table } from "lucide-react";
import BoardView from "../boardView";
import ListView from "../listView";
import TimelineView from "../timelineView";
import TableView from "../tableVIew";

type Props = {
  id: number;
};

export default function ProjectTabs({ id }: Props) {
  return (
    <Tabs defaultValue="board">
      <TabsList>
        <TabsTrigger value="board" className="flex items-center gap-2">
          <Grid3X3 aria-hidden className="h-4 w-4" />
          <span>Board</span>
        </TabsTrigger>
        <TabsTrigger value="list" className="flex items-center gap-2">
          <List aria-hidden className="h-4 w-4" />
          <span>List</span>
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center gap-2">
          <Clock aria-hidden className="h-4 w-4" />
          <span>Timeline</span>
        </TabsTrigger>
        <TabsTrigger value="table" className="flex items-center gap-2">
          <Table aria-hidden className="h-4 w-4" />
          <span>Table</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="board">
        <BoardView id={id} />
      </TabsContent>
      <TabsContent value="list">
        <ListView id={id} />
      </TabsContent>
      <TabsContent value="timeline">
        <TimelineView id={id} />
      </TabsContent>
      <TabsContent value="table">
        <TableView id={id} />
      </TabsContent>
    </Tabs>
  );
}
