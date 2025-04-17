import { useLocation, useNavigate } from 'react-router-dom';

export default function DisplayPage() {
  const location = useLocation();
  const { industry, region } = location.state || {};
  const navigate = useNavigate();

  //  const industry = location.state?.industry;
  if (!industry || !region) {
    // No text passed? Redirect back.
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Generated Report</h1>
        <p className="text-lg mt-4">Industry: {industry}</p>
        <p className="text-lg">Region: {region}</p>
      </div>
    </div>
  );
}
