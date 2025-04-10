
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import { FundData } from "@/lib/types";
import { Vector3 } from "three";

interface PerformancePlotProps {
  fund: FundData;
  position: [number, number, number];
  color: string;
}

const PerformancePlot = ({ fund, position, color }: PerformancePlotProps) => {
  const meshRef = useRef<any>();
  
  // Generate points based on performance data
  const points = [
    new Vector3(-2, fund.returns["1Y"] * 5, 0),
    new Vector3(0, fund.returns["3Y"] * 3, 0),
    new Vector3(2, fund.returns["5Y"] * 2, 0),
  ];

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={position}>
      {/* Line chart for returns */}
      <Line
        points={points}
        color={color}
        lineWidth={2}
      />
      
      {/* Points for each data point */}
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      
      {/* Text label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {fund.scheme_name}
      </Text>
      
      {/* Ring representing AUM */}
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color={color} opacity={0.7} transparent />
      </mesh>
    </group>
  );
};

interface FundPerformance3DProps {
  funds: FundData[];
}

export const FundPerformance3D = ({ funds }: FundPerformance3DProps) => {
  const colors = ["#896EF1", "#0EA5E9", "#38A169", "#E53E3E"];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={true} />
        
        {funds.map((fund, i) => (
          <PerformancePlot
            key={fund.id}
            fund={fund}
            position={[i * 4 - (funds.length - 1) * 2, 0, 0]}
            color={colors[i % colors.length]}
          />
        ))}
        
        {/* Coordinate axes for reference */}
        <group>
          <Line 
            points={[
              [0, -3, 0],
              [0, 3, 0]
            ]}
            color="gray" 
            lineWidth={1} 
          />
          <Line 
            points={[
              [-3, 0, 0],
              [3, 0, 0]
            ]}
            color="gray" 
            lineWidth={1} 
          />
        </group>
        
        <Text position={[0, 3.3, 0]} fontSize={0.3} color="gray">
          Returns %
        </Text>
        <Text position={[3.3, 0, 0]} fontSize={0.3} color="gray">
          Time Period
        </Text>
      </Canvas>
    </div>
  );
};
