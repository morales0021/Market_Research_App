import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveBar from "@/charts/primitive_charts/bar_chart";
import ResponsiveLine from "@/charts/primitive_charts/line_chart";
import ResponsivePie from "@/charts/primitive_charts/pie_chart";

export default function ResearchReport({ contentSection }) {
  const strongText = contentSection.content
    .replace(/<important>/g, "<strong>")
    .replace(/<\/important>/g, "</strong>");

  const formattedText = strongText.split("\n").map((paragraph, index) => (
    <React.Fragment key={index}>
      <p
        className="text-sm text-muted-foreground mb-6"
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    </React.Fragment>
  ));

  // Filter charts by type
  const charts = contentSection.plots.map((plot, index) => {
    if (plot.type_chart === "line_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "300px" }}>
              <ResponsiveLine data={plot.data} legend={plot.legend} />
            </div>
          </CardContent>
        </Card>
      );
    } else if (plot.type_chart === "pie_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "300px" }}>
              <ResponsivePie data={plot.data} />
            </div>
          </CardContent>
        </Card>
      );
    } else if (plot.type_chart === "bar_chart") {
      return (
        <Card key={index}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">{plot.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{plot.description}</p>
            <div style={{ height: "300px" }}>
              <ResponsiveBar data={plot.data} keys={plot.keys} indexBy={plot.indexBy} />
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">AI Adoption in the Maritime Industry — Q2 2025</h1>
        <p className="text-muted-foreground text-lg">
          A snapshot of current trends and implementation challenges
        </p>
      </div>

      {/* Text Content */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Trends Overview</h2>
            <p className="text-sm text-muted-foreground">{formattedText}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Content */}
      <div className="space-y-6">
        {/* First two charts side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {charts.slice(0, 2)}
        </div>

        {/* Remaining charts stacked below */}
        <div className="space-y-6">{charts.slice(2)}</div>
      </div>
    </div>
  );
}