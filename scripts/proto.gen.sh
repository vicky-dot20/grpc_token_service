#!/bin/bash
# Usage: proto.gen.sh Path(s)
# PATH: Proto file path of specific service
argc=$#
argv=("$@")

# The directory of your proto files
for ((j=0; j<argc; ++j)); do 
    mkdir -p src/proto/${argv[j]}/
    rm -rf src/proto/${argv[j]}/*

    # Generate code for ${service_name}.proto
    # example: enrichment/enrichment.proto
    pnpm exec proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/proto/${argv[j]}/ proto/${argv[j]}/${argv[j]}.proto

    # Generate code for all other .proto files
    pnpm exec proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/proto/${argv[j]}/ $(find proto/${argv[j]}/ -type f -name "*.proto" -not -path "proto/${argv[j]}/${argv[j]}.proto")
done
