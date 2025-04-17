import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export default function ReportGenerator() {
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!industry || !region) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/display', { state: { industry, region } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Generate Market Research Report</h1>
        <CardContent className="space-y-4">
        <div>
            <label className="block mb-1 font-medium">Enter Industry / Sector</label>
            <Input
              type="text"
              placeholder="e.g. Healthcare, Finance, Technology"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Region / Country</label>
            <Input
              type="text"
              placeholder="e.g. France, MENA, North America"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-4">
            {loading ? "Generating..." : "Generate Report"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
